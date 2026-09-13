import type { ClothingItem, ToyItem } from '../types';

export const CLOTHES_CATALOG: ClothingItem[] = [
  { id: 'pink-onesie', name: 'Pink Onesie', slot: 'onesie' },
  { id: 'blue-onesie', name: 'Blue Onesie', slot: 'onesie' },
  { id: 'mint-onesie', name: 'Mint Onesie', slot: 'onesie' },
  { id: 'sun-hat', name: 'Sun Hat', slot: 'hat' },
  { id: 'beanie', name: 'Cozy Beanie', slot: 'hat' },
  { id: 'bunny-hat', name: 'Bunny Hat', slot: 'hat' },
  { id: 'sneakers', name: 'Tiny Sneakers', slot: 'shoes' },
  { id: 'booties', name: 'Soft Booties', slot: 'shoes' },
];

export const TOY_CATALOG: ToyItem[] = [
  { id: 'rattle', name: 'Baby Rattle' },
  { id: 'teddy', name: 'Teddy Bear' },
  { id: 'ball', name: 'Bouncy Ball' },
  { id: 'blocks', name: 'Building Blocks' },
];
