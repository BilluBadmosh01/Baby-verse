import { useMemo } from 'react';

interface Star {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface StarsProps {
  count?: number;
}

export function Stars({ count = 28 }: StarsProps) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 4,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 6px rgba(255,255,255,0.9)',
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
