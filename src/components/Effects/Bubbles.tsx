import { useMemo } from 'react';

interface Bubble {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  hue: string;
}

const hues = [
  'rgba(255, 176, 195, 0.35)',
  'rgba(255, 216, 130, 0.32)',
  'rgba(124, 196, 255, 0.32)',
  'rgba(134, 233, 179, 0.3)',
  'rgba(196, 186, 255, 0.32)',
];

interface BubblesProps {
  count?: number;
}

export function Bubbles({ count = 16 }: BubblesProps) {
  const bubbles = useMemo<Bubble[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        size: 12 + Math.random() * 48,
        duration: 12 + Math.random() * 16,
        delay: Math.random() * 18,
        drift: (Math.random() - 0.5) * 80,
        hue: hues[i % hues.length],
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full animate-floatBubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), ${b.hue})`,
            boxShadow: 'inset 0 0 12px rgba(255,255,255,0.4)',
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ['--drift' as string]: `${b.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
