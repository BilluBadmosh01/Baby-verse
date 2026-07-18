import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Gender, Mood, SceneName, ToyId } from '../types';
import type { ClothingItem } from '../types';

export interface GameState {
  gender: Gender;
  mood: Mood;
  hunger: number;
  energy: number;
  sleep: number;
  happiness: number;
  selectedClothes: ClothingItem[];
  selectedToy: ToyId | null;
  scene: SceneName;

  setScene: (scene: SceneName) => void;
  setGender: (gender: Gender) => void;
  setMood: (mood: Mood) => void;
  setStat: (stat: 'hunger' | 'energy' | 'sleep' | 'happiness', value: number) => void;
  setSelectedToy: (toy: ToyId | null) => void;
  equipClothing: (item: ClothingItem) => void;
  unequipClothing: (slot: ClothingItem['slot']) => void;
  reset: () => void;
}

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const initialCore = {
  gender: 'girl' as Gender,
  mood: 'happy' as Mood,
  hunger: 100,
  energy: 100,
  sleep: 100,
  happiness: 100,
  selectedClothes: [] as ClothingItem[],
  selectedToy: null as ToyId | null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialCore,
      scene: 'landing',

      setScene: (scene) => set({ scene }),
      setGender: (gender) => set({ gender }),
      setMood: (mood) => set({ mood }),
      setStat: (stat, value) => set({ [stat]: clamp(value) } as Pick<GameState, typeof stat>),
      setSelectedToy: (toy) => set({ selectedToy: toy }),

      equipClothing: (item) =>
        set((state) => ({
          selectedClothes: [
            ...state.selectedClothes.filter((c) => c.slot !== item.slot),
            item,
          ],
        })),
      unequipClothing: (slot) =>
        set((state) => ({
          selectedClothes: state.selectedClothes.filter((c) => c.slot !== slot),
        })),

      reset: () => set({ ...initialCore, scene: 'landing' }),
    }),
    {
      name: 'babyverse-save',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        gender: state.gender,
        mood: state.mood,
        hunger: state.hunger,
        energy: state.energy,
        sleep: state.sleep,
        happiness: state.happiness,
        selectedClothes: state.selectedClothes,
        selectedToy: state.selectedToy,
      }),
    }
  )
);
