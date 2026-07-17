import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { cn } from '../lib/utils';

export const spotlightMaskStyle = (
  size: number,
  intensity: number
): CSSProperties => ({
  background: `radial-gradient(${size}px circle at var(--spot-x,-200px) var(--spot-y,-200px), rgba(255,255,255,${intensity}), rgba(255,255,255,0) 60%)`,
  padding: '1px',
  WebkitMask:
    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
});

const RADIUS_CLASS = {
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
} as const;

interface SpotlightBorderProps {
  as?: 'div' | 'button' | 'section';
  radius?: keyof typeof RADIUS_CLASS;
  size?: number;
  intensity?: number;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function SpotlightBorder({
  as = 'div',
  radius = '2xl',
  size = 300,
  intensity = 0.3,
  className,
  children,
  onClick,
}: SpotlightBorderProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref as never}
      onClick={onClick}
      type={as === 'button' ? 'button' : undefined}
      className={cn('relative', RADIUS_CLASS[radius], className)}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0',
          RADIUS_CLASS[radius]
        )}
        style={spotlightMaskStyle(size, intensity)}
      />
      {children}
    </Tag>
  );
}
