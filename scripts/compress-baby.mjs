import { readFileSync } from 'fs';
import { resolve } from 'path';
import { NodeIO } from '@gltf-transform/core';
import { dedup, prune, meshopt, draco, resample, unweld } from '@gltf-transform/functions';
import { EXTMeshoptCompression, EXTTextureWebP, KHRDracoMeshCompression } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

const inPath = 'Public/Models/baby-optimized.glb';
const outPath = 'Public/Models/baby-compressed.glb';

const decoder = await draco3d.createDecoderModule();
const encoder = await draco3d.createEncoderModule();
await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;

const io = new NodeIO()
  .registerExtensions([EXTMeshoptCompression, EXTTextureWebP, KHRDracoMeshCompression])
  .registerDependencies({
    'draco3d.decoder': decoder,
    'draco3d.encoder': encoder,
    'meshopt.encoder': MeshoptEncoder,
    'meshopt.simplifier': MeshoptSimplifier,
  });

const doc = await io.read(resolve(inPath));
const root = doc.getRoot();
const meshes = root.listMeshes();
const animations = root.listAnimations();

const usedWeightIndices = new Set();
animations.forEach((a) => {
  a.listChannels().forEach((ch) => {
    if (ch.getTargetPath() === 'weights') {
      const acc = ch.getSampler().getOutput();
      const arr = acc?.getArray?.();
      if (arr) for (let i = 0; i < arr.length; i++) usedWeightIndices.add(arr[i]);
    }
  });
});

let prunedTargets = 0;
meshes.forEach((mesh) => {
  mesh.listPrimitives().forEach((prim) => {
    const targets = prim.listTargets();
    targets.forEach((tgt) => {
      const ti = targets.indexOf(tgt);
      const keep = usedWeightIndices.size === 0 || usedWeightIndices.has(ti);
      if (!keep) { prim.removeTarget(tgt); prunedTargets++; }
    });
  });
});
console.log(`pruned morph targets: ${prunedTargets}`);

await doc.transform(
  dedup({ property: ['accessors', 'bufferViews'] }),
  resample(),
  prune({ keepAttributes: false, keepLeaves: false }),
  draco({
    method: 'edgebreaker',
    encodeSpeed: 5,
    decodeSpeed: 5,
    quantizePosition: 14,
    quantizeNormal: 8,
    quantizeColor: 8,
    quantizeTexcoord: 12,
    quantizeGeneric: 12,
  }),
);

await io.write(resolve(outPath), doc);

const inSize = readFileSync(inPath).byteLength;
const outSize = readFileSync(outPath).byteLength;
console.log(`input:  ${(inSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`output: ${(outSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`ratio:  ${(outSize / inSize * 100).toFixed(1)}% (saved ${((1 - outSize / inSize) * 100).toFixed(1)}%)`);
