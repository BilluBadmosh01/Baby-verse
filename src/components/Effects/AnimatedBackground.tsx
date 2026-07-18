import { Bubbles } from './Bubbles';
import { Stars } from './Stars';
import { Clouds } from './Clouds';

interface AnimatedBackgroundProps {
  showStars?: boolean;
  showClouds?: boolean;
  showBubbles?: boolean;
}

export function AnimatedBackground({
  showStars = true,
  showClouds = true,
  showBubbles = true,
}: AnimatedBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-cream-100 to-blush-100" />
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blush-200/40 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sun-200/40 blur-3xl" />
      {showClouds && <Clouds />}
      {showStars && <Stars />}
      {showBubbles && <Bubbles />}
    </div>
  );
}
