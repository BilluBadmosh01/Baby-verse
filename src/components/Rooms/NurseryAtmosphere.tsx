import { useMemo } from 'react';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function NurseryAtmosphere() {
  const gradientGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(60, 32, 24);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const top = new THREE.Color('#fff2e2');
    const mid = new THREE.Color('#ffe2ec');
    const bot = new THREE.Color('#d9eaf5');
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 60;
      const t = (y + 1) / 2;
      if (t < 0.5) c.copy(bot).lerp(mid, t * 2);
      else c.copy(mid).lerp(top, (t - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <>
      <mesh geometry={gradientGeo} renderOrder={-1}>
        <meshBasicMaterial
          vertexColors
          side={THREE.BackSide}
          toneMapped={false}
          depthWrite={false}
          fog={false}
        />
      </mesh>

      <Sparkles
        count={50}
        scale={[14, 7, 14]}
        position={[0, 3, 0]}
        size={2.4}
        speed={0.12}
        opacity={0.45}
        color="#fff6e0"
      />
    </>
  );
}
