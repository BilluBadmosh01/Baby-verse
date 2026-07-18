import { useMemo } from 'react';
import { ContactShadows, Environment, SoftShadows } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { BabyPlaceholder } from '../Baby/BabyPlaceholder';

export function SceneContent() {
  const groundColor = '#ffe9c2';

  const config = useMemo(
    () => ({
      enablePerspectiveCamera: true,
      size: 32,
      samples: 16,
      focus: 0.8,
    }),
    []
  );

  return (
    <>
      <SoftShadows {...config} />

      <ambientLight intensity={0.55} color="#fff5e6" />
      <hemisphereLight args={['#ffe9ee', '#e3f4ff', 0.5]} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={1.4}
        color="#fff3d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-5, 3, -4]} intensity={0.4} color="#ffb0c3" />

      <Environment preset="apartment" environmentIntensity={0.55} />

      <BabyPlaceholder />

      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.35}
        scale={12}
        blur={2.6}
        far={4}
        color="#5a4a78"
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color={groundColor} roughness={0.9} />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate
        autoRotateSpeed={0.6}
        target={[0, 0.4, 0]}
      />
    </>
  );
}
