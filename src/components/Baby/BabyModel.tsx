import { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, LoopRepeat, MathUtils, Mesh as THREEMesh } from 'three';

const babyUrl = '/models/baby-compressed.glb';

interface BabyModelProps {
  scale?: number;
}

export function BabyModel({ scale = 1 }: BabyModelProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(babyUrl);
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    const idle = actions['AvatarCurrentMotion'] ?? actions['0_T-Pose'];
    if (!idle) return;
    idle.reset().setLoop(LoopRepeat, Infinity).setEffectiveTimeScale(0.6).fadeIn(0.5);
    idle.play();
    return () => {
      idle.fadeOut(0.3);
    };
  }, [actions]);

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  const targetScale = MathUtils.clamp(scale, 0.1, 10);

  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREEMesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group ref={group} scale={targetScale} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(babyUrl);
