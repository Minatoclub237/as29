import { useEffect, useRef, useState } from 'react';

const VIDEO_URL = '/media/water-droplet.mp4';

const FRAME_COUNT = 80;
const frameUrl = (i: number) =>
  `/media/frames/droplet/frame-${String(i).padStart(3, '0')}.webp`;

interface ScrollVideoProps {
  /** Scrollable length (in vh) this video scrubs across. Defaults to the whole document. */
  scrollLengthVh?: number;
}

export default function ScrollVideo({ scrollLengthVh }: ScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const [framesReady, setFramesReady] = useState(false);

  // Frame loading — pre-generated WebP frames, no runtime video decoding.
  // On failure the <video> fallback stays visible permanently.
  useEffect(() => {
    let cancelled = false;
    const loaded: ImageBitmap[] = [];

    async function load() {
      try {
        // Mobile loads every other frame: half the payload, still smooth.
        const step = window.innerWidth < 768 ? 2 : 1;
        const indices: number[] = [];
        for (let i = 0; i < FRAME_COUNT; i += step) indices.push(i);

        const bitmaps = await Promise.all(
          indices.map(async (i) => {
            const res = await fetch(frameUrl(i));
            if (!res.ok) throw new Error(`frame ${i} failed`);
            return createImageBitmap(await res.blob());
          })
        );
        if (cancelled) {
          bitmaps.forEach((b) => b.close());
          return;
        }
        loaded.push(...bitmaps);
        framesRef.current = loaded;
        setFramesReady(true);
      } catch {
        // Loading failed — do nothing, the video fallback stays visible.
      }
    }

    load();

    return () => {
      cancelled = true;
      loaded.forEach((b) => b.close());
    };
  }, []);

  // rAF scroll-sync loop — starts immediately on mount (video fallback),
  // re-runs when framesReady flips (canvas frame drawing takes over).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let target = 0;
    let smoothed = 0;
    let rafId = 0;

    // Mobile browsers refuse to paint a never-played video: autoplay the
    // muted fallback; if blocked (iOS low-power), force a first-frame decode.
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        video.currentTime = 0.01;
      });
    }

    const onScroll = () => {
      const max = scrollLengthVh
        ? (scrollLengthVh / 100) * window.innerHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };

    const tick = () => {
      smoothed += (target - smoothed) * 0.08;
      const frames = framesRef.current;

      if (frames.length > 1) {
        const idx = Math.min(
          frames.length - 1,
          Math.round(smoothed * (frames.length - 1))
        );
        const frame = frames[idx];
        // Cover-fit: scale up to fill, center the overflow.
        const scale = Math.max(
          canvas.width / frame.width,
          canvas.height / frame.height
        );
        const dw = frame.width * scale;
        const dh = frame.height * scale;
        ctx.drawImage(
          frame,
          (canvas.width - dw) / 2,
          (canvas.height - dh) / 2,
          dw,
          dh
        );
      }
      // No frames yet: the autoplaying <video> fallback is on screen.
      rafId = requestAnimationFrame(tick);
    };

    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [framesReady]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
      {!framesReady && (
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${
          framesReady ? '' : 'invisible'
        }`}
      />
    </div>
  );
}
