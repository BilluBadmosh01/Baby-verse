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

export type ActionId = 'feed' | 'clothes' | 'toys' | 'bath' | 'sleep' | 'camera' | 'settings';

export type ModalId = 'clothes' | 'toys' | null;

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

export interface FeedbackMessage {
  message: string;
  emoji: string;
  id: number;
}
