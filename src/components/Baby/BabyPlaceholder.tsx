import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import type { Group } from 'three';

interface BabyPlaceholderProps {
  color?: string;
  accent?: string;
}

export function BabyPlaceholder({ color = '#ffd3dd', accent = '#ff85a3' }: BabyPlaceholderProps) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.3) * 0.25;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group} position={[0, 0.6, 0]}>
        <RoundedBox args={[1.1, 1.1, 1.1]} radius={0.28} smoothness={8} castShadow receiveShadow>
          <meshStandardMaterial color={color} roughness={0.45} metalness={0.05} />
        </RoundedBox>
        <mesh position={[0, 0.9, 0.56]} castShadow>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={accent} roughness={0.5} />
        </mesh>
        <mesh position={[-0.28, 0.15, 0.56]} castShadow>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color="#2b2540" roughness={0.3} />
        </mesh>
        <mesh position={[0.28, 0.15, 0.56]} castShadow>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color="#2b2540" roughness={0.3} />
        </mesh>
        <mesh
          position={[0, -0.18, 0.56]}
          rotation={[0, 0, 0]}
          castShadow
        >
          <torusGeometry args={[0.12, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color={accent} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}
