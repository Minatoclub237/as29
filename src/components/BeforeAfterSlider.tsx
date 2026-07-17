import { useRef, useState, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(
      Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl"
      onPointerDown={(e) => {
        draggingRef.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) update(e.clientX);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerCancel={() => {
        draggingRef.current = false;
      }}
    >
      {/* Après — base layer */}
      <img
        src={after}
        alt={`${alt} — après`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Avant — clipped to the left of the divider */}
      <img
        src={before}
        alt={`${alt} — avant`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
        style={{ left: `${pos}%` }}
      />
      <div
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-500 shadow-[0_0_16px_rgba(56,189,248,0.7)]"
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight size={20} className="text-white" />
      </div>

      {/* Labels */}
      <span className="font-body absolute bottom-3 left-3 rounded-full bg-black/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
        Avant
      </span>
      <span className="font-body absolute bottom-3 right-3 rounded-full bg-sky-500 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
        Après
      </span>
    </div>
  );
}
