import { useMemo } from 'react';
import * as THREE from 'three';

export function NurseryFloor() {
  const alphaMap = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.65, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <circleGeometry args={[7, 96]} />
      <meshStandardMaterial
        color="#f7eed8"
        roughness={0.82}
        metalness={0}
        alphaMap={alphaMap}
        transparent
        envMapIntensity={0.4}
      />
    </mesh>
  );
}
