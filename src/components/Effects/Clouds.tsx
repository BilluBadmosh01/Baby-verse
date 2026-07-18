import { useMemo } from 'react';

interface CloudShape {
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface CloudsProps {
  count?: number;
}

export function Clouds({ count = 5 }: CloudsProps) {
  const clouds = useMemo<CloudShape[]>(
    () =>
      Array.from({ length: count }, () => ({
        top: 5 + Math.random() * 55,
        size: 80 + Math.random() * 120,
        duration: 40 + Math.random() * 50,
        delay: -Math.random() * 60,
        opacity: 0.4 + Math.random() * 0.4,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute animate-drift"
          style={{
            top: `${c.top}%`,
            width: c.size,
            height: c.size * 0.5,
            opacity: c.opacity,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <Cloud />
        </div>
      ))}
    </div>
  );
}

function Cloud() {
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full" fill="white">
      <ellipse cx="40" cy="40" rx="28" ry="20" />
      <ellipse cx="65" cy="30" rx="26" ry="22" />
      <ellipse cx="85" cy="42" rx="24" ry="18" />
      <ellipse cx="55" cy="44" rx="32" ry="16" />
    </svg>
  );
}
