import { useEffect, useRef, useState } from 'react';

const VIDEO_URL = '/media/water-droplet.mp4';

const MAX_FRAMES = 120;
const MIN_FRAMES = 30;
const MAX_WIDTH = 1280;

interface ScrollVideoProps {
  /** Scrollable length (in vh) this video scrubs across. Defaults to the whole document. */
  scrollLengthVh?: number;
}

export default function ScrollVideo({ scrollLengthVh }: ScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const [framesReady, setFramesReady] = useState(false);

  // Frame extraction — runs once. On failure the <video> fallback stays visible permanently.
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    const extracted: ImageBitmap[] = [];

    async function extract() {
      try {
        const res = await fetch(VIDEO_URL);
        const blob = await res.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);

        const video = document.createElement('video');
        video.src = objectUrl;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve();
          video.onerror = () => reject(new Error('video load failed'));
        });
        if (cancelled) return;

        // iOS needs the decode pipeline unlocked before frames can be drawn.
        try {
          await video.play();
          video.pause();
        } catch {
          /* autoplay refused — seeks below still decode */
        }
        if (cancelled) return;

        // Lighter budget on mobile: fewer, smaller frames (memory).
        const mobile = window.innerWidth < 768;
        const maxWidth = mobile ? 720 : MAX_WIDTH;
        const frameCount = Math.min(
          mobile ? 64 : MAX_FRAMES,
          Math.max(MIN_FRAMES, Math.round(video.duration * 24))
        );
        const scale = Math.min(1, maxWidth / video.videoWidth);
        const w = Math.round(video.videoWidth * scale);
        const h = Math.round(video.videoHeight * scale);

        // Route frames through a 2D canvas: createImageBitmap(video) is not
        // supported on iOS Safari, but drawImage + createImageBitmap(canvas)
        // works everywhere.
        const grab = document.createElement('canvas');
        grab.width = w;
        grab.height = h;
        const gctx = grab.getContext('2d');
        if (!gctx) throw new Error('no 2d context');

        for (let i = 0; i < frameCount; i++) {
          if (cancelled) return;
          const t = (i / (frameCount - 1)) * Math.max(0, video.duration - 0.05);
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked);
              resolve();
            };
            video.addEventListener('seeked', onSeeked);
            video.onerror = () => reject(new Error('seek failed'));
            video.currentTime = t;
          });
          if (cancelled) return;
          gctx.drawImage(video, 0, 0, w, h);
          const bitmap = await createImageBitmap(grab);
          extracted.push(bitmap);
        }
        if (cancelled) return;

        framesRef.current = extracted;
        setFramesReady(true);
      } catch {
        // Extraction failed — do nothing, the video fallback stays visible.
      }
    }

    extract();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      extracted.forEach((b) => b.close());
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
