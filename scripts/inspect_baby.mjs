import { readFileSync } from 'fs';

const b = readFileSync('public/models/baby.glb');
const jsonLen = b.readUInt32LE(12);
const json = JSON.parse(b.slice(20, 20 + jsonLen).toString('utf8'));

console.log('scenes:', json.scenes?.length, 'nodes:', json.nodes?.length, 'meshes:', json.meshes?.length);
const rootScene = json.scenes?.[0];
console.log('root scene nodes:', rootScene?.nodes);

// Print root node transforms
for (const ni of (rootScene?.nodes || [])) {
  const n = json.nodes[ni];
  console.log(`node[${ni}] name="${n.name}" translation=${JSON.stringify(n.translation)} scale=${JSON.stringify(n.scale)} mesh=${n.mesh} children=${JSON.stringify(n.children?.slice(0,5))}`);
}

// Compute overall bounding box from POSITION accessor min/max
let overallMin = [Infinity, Infinity, Infinity];
let overallMax = [-Infinity, -Infinity, -Infinity];
let posCount = 0;
for (const acc of (json.accessors || [])) {
  if (acc.type === 'VEC3' && acc.min && acc.max) {
    // Heuristic: POSITION accessors are typically the first attribute; check by name if available
    posCount++;
    for (let i = 0; i < 3; i++) {
      if (acc.min[i] < overallMin[i]) overallMin[i] = acc.min[i];
      if (acc.max[i] > overallMax[i]) overallMax[i] = acc.max[i];
    }
  }
}
console.log('VEC3 accessor count:', posCount);
console.log('Overall min:', overallMin.map(n=>n.toFixed(3)));
console.log('Overall max:', overallMax.map(n=>n.toFixed(3)));
const size = overallMax.map((v,i)=>v-overallMin[i]);
console.log('Size (x,y,z):', size.map(n=>n.toFixed(3)));
const center = overallMax.map((v,i)=>(v+overallMin[i])/2);
console.log('Center:', center.map(n=>n.toFixed(3)));
console.log('Scale to 2.2 height:', (2.2/(size[1]||1)).toFixed(4));
console.log('floorY (-min.y*scale):', (-overallMin[1]*(2.2/(size[1]||1))).toFixed(4));

// Check meshes for material references and primitive info
let pi = 0;
for (const m of (json.meshes || [])) {
  for (const p of m.primitives) {
    pi++;
    if (pi <= 6) {
      const posAcc = p.attributes?.POSITION != null ? json.accessors[p.attributes.POSITION] : null;
      console.log(`prim[${pi}] mesh="${m.name}" material=${p.material} mode=${p.mode ?? 4} posMin=${JSON.stringify(posAcc?.min?.map(n=>+n.toFixed(2)))} posMax=${JSON.stringify(posAcc?.max?.map(n=>+n.toFixed(2)))}`);
    }
  }
}
console.log('Total primitives:', pi);
