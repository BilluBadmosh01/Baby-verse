import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { SceneContent } from './SceneContent';

interface BabyCanvasProps {
  className?: string;
}

export function BabyCanvas({ className }: BabyCanvasProps) {
  return (
    <Canvas
      className={className}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [3.5, 2.4, 4.5], fov: 42 }}
    >
      <color attach="background" args={['#fff8ec']} />
      <fog attach="fog" args={['#fff8ec', 12, 26]} />
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
