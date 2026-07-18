export type Gender = 'boy' | 'girl';

export type Mood =
  | 'happy'
  | 'sleepy'
  | 'hungry'
  | 'playful'
  | 'sad'
  | 'excited';

export type SceneName = 'landing' | 'game' | 'settings' | 'about';

export type RoomId = 'nursery' | 'kitchen' | 'bathroom' | 'bedroom' | 'closet';

export type ClothingSlot = 'onesie' | 'hat' | 'shoes';

export type ToyId = 'rattle' | 'teddy' | 'ball' | 'blocks';

export interface ClothingItem {
  id: string;
  name: string;
  slot: ClothingSlot;
}

export interface ToyItem {
  id: ToyId;
  name: string;
}

export interface StatSnapshot {
  mood: Mood;
  hunger: number;
  energy: number;
  sleep: number;
  happiness: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicVolume: number;
  effectsVolume: number;
  quality: 'low' | 'high';
}
