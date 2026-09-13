import { Component, Suspense, lazy, useEffect, useMemo, useRef, type ReactNode } from 'react';
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
import {
  ACESFilmicToneMapping,
  Box3,
  Group,
  LoopRepeat,
  Matrix4,
  Mesh as THREEMesh,
  SRGBColorSpace,
  Vector3,
} from 'three';
import { NurseryAtmosphere } from './NurseryAtmosphere';
import { NurseryFloor } from './NurseryFloor';

const SceneEffects = lazy(() =>
  import('./SceneEffects').then((m) => ({ default: m.SceneEffects }))
);

const MODEL_URL = '/models/baby.glb';
const TARGET_HEIGHT = 2.2;
const UPRIGHT_ROTATION_X = -Math.PI / 2;

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

  const transform = useMemo(() => {
    const m = new Matrix4().makeRotationX(UPRIGHT_ROTATION_X);
    const box = new Box3().setFromObject(scene).applyMatrix4(m);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const height = size.y || 1;
    const scale = TARGET_HEIGHT / height;
    return {
      scale,
      offsetX: -center.x * scale,
      offsetY: -box.min.y * scale,
      offsetZ: -center.z * scale,
    };
  }, [scene]);

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
      if (!(obj as THREEMesh).isMesh) return;
      const mesh = obj as THREEMesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.visible = true;
      mesh.frustumCulled = true;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if ('envMapIntensity' in m) (m as { envMapIntensity: number }).envMapIntensity = 0.9;
        if ('roughness' in m && typeof m.roughness === 'number') {
          m.roughness = Math.max(0.45, m.roughness);
        }
        if ('transparent' in m) m.transparent = false;
        if ('side' in m) m.side = 0;
      });
    });
  }, [scene]);

  return (
    <group
      ref={group}
      rotation={[UPRIGHT_ROTATION_X, 0, 0]}
      scale={transform.scale}
      position={[transform.offsetX, transform.offsetY, transform.offsetZ]}
    >
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
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0, 2.4, 5.6], fov: 38, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
      }}
    >
      <SoftShadows size={28} samples={20} focus={0.85} />

      <ambientLight intensity={0.45} color="#fff3e0" />

      <directionalLight
        position={[4, 7, 5]}
        intensity={2.8}
        color="#fff3d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />

      <directionalLight position={[-6, 4, 2]} intensity={0.7} color="#bcd9ff" />

      <directionalLight position={[0, 4.5, -7]} intensity={1.2} color="#ffd1e0" />

      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.6} />
      </Suspense>

      <Suspense fallback={null}>
        <NurseryAtmosphere />
        <ModelErrorBoundary>
          <BabyModel />
        </ModelErrorBoundary>
      </Suspense>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={9}
        blur={3}
        far={4.5}
        resolution={1024}
        color="#4a3a52"
      />

      <NurseryFloor />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate
        enableZoom
        minDistance={3.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 1.0, 0]}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.55}
        zoomSpeed={0.6}
      />

      <Suspense fallback={null}>
        <SceneEffects />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
