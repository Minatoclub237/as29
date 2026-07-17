import { useEffect, useRef } from 'react';

interface Callout {
  num: string;
  title: string;
  side: 1 | -1; // 1 = extends right of the water, -1 = left
  anchor: [number, number]; // dot pinned on the droplet's path (viewport fractions)
  elbow: [number, number]; // where the trait bends to horizontal
  end: [number, number]; // tip of the horizontal run
  band: [number, number]; // scroll-progress window
}

const CALLOUTS: Callout[] = [
  {
    num: '01',
    title: 'Prise de contact',
    side: 1,
    anchor: [0.535, 0.3],
    elbow: [0.62, 0.21],
    end: [0.85, 0.21],
    band: [0.1, 0.38],
  },
  {
    num: '02',
    title: 'Diagnostic',
    side: -1,
    anchor: [0.465, 0.44],
    elbow: [0.38, 0.35],
    end: [0.15, 0.35],
    band: [0.42, 0.62],
  },
  {
    num: '03',
    title: 'Intervention',
    side: 1,
    anchor: [0.535, 0.57],
    elbow: [0.62, 0.48],
    end: [0.85, 0.48],
    band: [0.66, 0.84],
  },
  {
    num: '04',
    title: 'Satisfaction',
    side: -1,
    anchor: [0.465, 0.7],
    elbow: [0.38, 0.63],
    end: [0.15, 0.63],
    band: [0.87, 1], // dissolves as the AETHER chapter takes over
  },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function AquaCallouts() {
  const lineRefs = useRef<(SVGPolylineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lengthsRef = useRef<number[]>([]);

  useEffect(() => {
    let target = 0;
    let smoothed = 0;
    let rafId = 0;

    // Position lines, dots and labels from viewport fractions.
    const layout = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      CALLOUTS.forEach((c, i) => {
        const line = lineRefs.current[i];
        const dot = dotRefs.current[i];
        const outer = outerRefs.current[i];
        if (line) {
          const pts = [c.anchor, c.elbow, c.end]
            .map(([fx, fy]) => `${fx * W},${fy * H}`)
            .join(' ');
          line.setAttribute('points', pts);
          const len = line.getTotalLength();
          lengthsRef.current[i] = len;
          line.style.strokeDasharray = String(len);
          line.style.strokeDashoffset = String(len);
        }
        if (dot) {
          dot.setAttribute('cx', String(c.anchor[0] * W));
          dot.setAttribute('cy', String(c.anchor[1] * H));
        }
        if (outer) {
          outer.style.left = `${c.elbow[0] * W + c.side * 8}px`;
          outer.style.top = `${c.elbow[1] * H - 14}px`;
          outer.style.transform =
            c.side === 1 ? 'translate(0, -100%)' : 'translate(-100%, -100%)';
        }
      });
    };

    const onScroll = () => {
      // Water chapter only: 360vh runway minus one viewport.
      const max = window.innerHeight * 2.6;
      target = clamp01(window.scrollY / max);
    };

    const tick = () => {
      // Same interpolation as the video scrub — one fluid system.
      smoothed += (target - smoothed) * 0.08;
      const p = smoothed;

      CALLOUTS.forEach((c, i) => {
        const line = lineRefs.current[i];
        const dot = dotRefs.current[i];
        const outer = outerRefs.current[i];
        const inner = innerRefs.current[i];
        const [a, b] = c.band;
        const active = p >= a && p <= b;
        // 1) dot blooms + trait draws itself out of the water (fast entrance
        //    so the fully-readable plateau lasts as long as possible)
        const lineT = easeOut(clamp01((p - a) / 0.045));
        // 2) label condenses out of a blur once the trait has landed
        const textT = easeOut(clamp01((p - a - 0.035) / 0.035));
        // 3) everything dissolves before the next callout — quick exit,
        //    long readable plateau
        const out = clamp01((b - p) / 0.035);
        const op = active ? Math.min(1, out) : 0;

        if (line) {
          line.style.strokeDashoffset = String(
            (lengthsRef.current[i] || 0) * (1 - lineT)
          );
          line.style.opacity = String(op);
        }
        if (dot) {
          dot.setAttribute('r', String(5 * lineT));
          dot.style.opacity = String(op);
        }
        if (outer) {
          outer.style.visibility = op <= 0.001 ? 'hidden' : 'visible';
        }
        if (inner) {
          inner.style.opacity = String(op * textT);
          inner.style.transform = `translateY(${(1 - textT) * 26}px)`;
          inner.style.filter = `blur(${(1 - textT) * 8}px)`;
        }
        // Live percentage — counts 0→100% across this step's scroll band,
        // scrubbing backwards when scrolling up.
        const num = numRefs.current[i];
        if (num) {
          const bandEnd = Math.min(b, 1);
          const pct = Math.round(clamp01((p - a) / (bandEnd - a)) * 100);
          num.textContent = `${pct}%`;
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    layout();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <svg className="absolute inset-0 h-full w-full">
        {CALLOUTS.map((c, i) => (
          <g key={c.num}>
            <polyline
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              fill="none"
              stroke="rgba(186, 230, 253, 0.85)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: 0,
                filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.8))',
              }}
            />
            <circle
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              r="0"
              fill="#7dd3fc"
              style={{
                opacity: 0,
                filter: 'drop-shadow(0 0 8px rgba(125, 211, 252, 0.9))',
              }}
            />
          </g>
        ))}
      </svg>
      {CALLOUTS.map((c, i) => (
        <div
          key={c.num}
          ref={(el) => {
            outerRefs.current[i] = el;
          }}
          className="absolute"
          style={{ visibility: 'hidden' }}
        >
          <div
            ref={(el) => {
              innerRefs.current[i] = el;
            }}
            className={`max-w-[62vw] will-change-transform sm:max-w-none ${
              c.side === 1 ? 'text-left' : 'text-right'
            }`}
            style={{ opacity: 0 }}
          >
            <div
              ref={(el) => {
                numRefs.current[i] = el;
              }}
              className="font-script text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-none text-sky-300 [text-shadow:0_0_24px_rgba(56,189,248,0.75)]"
            >
              0%
            </div>
            <div className="font-script mt-1 whitespace-normal text-[clamp(1.4rem,4vw,3.4rem)] font-bold leading-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.8),0_0_34px_rgba(125,211,252,0.35)] sm:whitespace-nowrap">
              {c.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
