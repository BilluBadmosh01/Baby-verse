import { Component, Suspense, useEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  SoftShadows,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { Box3, Group, LoopRepeat, Mesh as THREEMesh, Vector3 } from 'three';

const MODEL_URL = '/models/baby.glb';

class ModelErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state: { hasError: boolean } = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Failed to load baby model:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="select-none rounded-2xl bg-white/85 px-5 py-3 text-sm font-medium text-rose-600 shadow-lg backdrop-blur-md">
            Unable to load baby model.
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

function BabyModel() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    const idle = actions['AvatarCurrentMotion'] ?? actions['0_T-Pose'];
    if (!idle) return;
    idle.reset().setLoop(LoopRepeat, Infinity).setEffectiveTimeScale(0.6).fadeIn(0.4);
    idle.play();
    return () => {
      idle.fadeOut(0.3);
    };
  }, [actions]);

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREEMesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    const obj = group.current;
    if (!obj) return;
    const box = new Box3().setFromObject(obj);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2;
    const scale = targetSize / maxDim;

    obj.scale.setScalar(scale);
    obj.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
  }, [scene]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

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
      camera={{ position: [0, 1.5, 4], fov: 45 }}
    >
      <color attach="background" args={['#f7f3ee']} />

      <SoftShadows size={25} samples={16} focus={0.9} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
      />

      <Environment preset="studio" />

      <Suspense fallback={null}>
        <ModelErrorBoundary>
          <BabyModel />
        </ModelErrorBoundary>
      </Suspense>

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.45}
        scale={10}
        blur={2.4}
        far={4}
        color="#3a2e4a"
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow visible={false}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableRotate
        enableZoom
        minDistance={2}
        maxDistance={5}
        target={[0, 0.8, 0]}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
