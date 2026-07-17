import { useEffect, useRef, useState, type ReactNode } from 'react';

interface CoverPinProps {
  children: ReactNode;
  /** Wrapper extras: z-index, negative margins for overlapping the previous pin. */
  className?: string;
}

/**
 * Pins its content once it has been fully scrolled through, then holds it
 * for one extra viewport so the next section slides over it like a curtain.
 * Works with content of any height: the sticky offset is measured so pinning
 * starts exactly when the content's bottom reaches the viewport bottom.
 */
export default function CoverPin({ children, className = '' }: CoverPinProps) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () =>
      setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={innerRef} className="sticky" style={{ top: `${top}px` }}>
        {children}
      </div>
      {/* Held beat — the next section rides over the pinned content */}
      <div className="h-screen" aria-hidden="true" />
    </div>
  );
}
