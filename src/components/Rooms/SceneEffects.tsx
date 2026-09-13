import { Bloom, EffectComposer, N8AO, Vignette } from '@react-three/postprocessing';

export function SceneEffects() {
  return (
    <EffectComposer multisampling={4}>
      <N8AO aoRadius={0.45} intensity={0.55} halfRes color="#5a4a3a" />
      <Bloom
        intensity={0.32}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <Vignette offset={0.32} darkness={0.5} eskil={false} />
    </EffectComposer>
  );
}
