import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Gender,
  Mood,
  SceneName,
  ToyId,
  ClothingItem,
  ActionId,
  ModalId,
  FeedbackMessage,
} from '../types';
import { TOY_CATALOG } from '../data/catalogs';

const DECAY_RATES = {
  hunger: 5 / 60,
  sleep: 4 / 60,
  energy: 3 / 60,
  happiness: 4 / 60,
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

function computeMood(
  hunger: number,
  sleep: number,
  energy: number,
  happiness: number
): Mood {
  if (hunger < 20 || sleep < 20 || happiness < 20) return 'sad';
  if (hunger < 40) return 'hungry';
  if (sleep < 40) return 'sleepy';
  if (happiness > 80 && energy > 60) return 'excited';
  if (happiness > 70 && energy > 50) return 'happy';
  if (happiness > 40) return 'playful';
  return 'happy';
}

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
  activeModal: ModalId;
  feedback: FeedbackMessage | null;

  setScene: (scene: SceneName) => void;
  setGender: (gender: Gender) => void;
  setMood: (mood: Mood) => void;
  setStat: (stat: 'hunger' | 'energy' | 'sleep' | 'happiness', value: number) => void;
  setSelectedToy: (toy: ToyId | null) => void;
  selectToy: (toy: ToyId) => void;
  equipClothing: (item: ClothingItem) => void;
  unequipClothing: (slot: ClothingItem['slot']) => void;
  performAction: (action: ActionId) => void;
  setActiveModal: (modal: ModalId) => void;
  tick: (deltaSeconds: number) => void;
  clearFeedback: () => void;
  reset: () => void;
}

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
      activeModal: null,
      feedback: null,

      setScene: (scene) => set({ scene }),
      setGender: (gender) => set({ gender }),
      setMood: (mood) => set({ mood }),
      setStat: (stat, value) =>
        set({ [stat]: clamp(value) } as Pick<GameState, typeof stat>),

      setSelectedToy: (toy) => set({ selectedToy: toy }),

      selectToy: (toy) =>
        set((state) => {
          const happiness = clamp(state.happiness + 20);
          const energy = clamp(state.energy - 8);
          const hunger = clamp(state.hunger - 3);
          const toyName = TOY_CATALOG.find((t) => t.id === toy)?.name ?? 'toy';
          return {
            selectedToy: toy,
            happiness,
            energy,
            hunger,
            mood: computeMood(hunger, state.sleep, energy, happiness),
            feedback: {
              message: `Playing with ${toyName}!`,
              emoji: '🧸',
              id: Date.now(),
            },
            activeModal: null,
          };
        }),

      equipClothing: (item) =>
        set((state) => {
          const happiness = clamp(state.happiness + 3);
          return {
            selectedClothes: [
              ...state.selectedClothes.filter((c) => c.slot !== item.slot),
              item,
            ],
            happiness,
            mood: computeMood(
              state.hunger,
              state.sleep,
              state.energy,
              happiness
            ),
            feedback: {
              message: `Wearing ${item.name}!`,
              emoji: '👕',
              id: Date.now(),
            },
          };
        }),

      unequipClothing: (slot) =>
        set((state) => ({
          selectedClothes: state.selectedClothes.filter((c) => c.slot !== slot),
        })),

      performAction: (action) =>
        set((state) => {
          switch (action) {
            case 'feed': {
              const hunger = clamp(state.hunger + 35);
              const happiness = clamp(state.happiness + 5);
              return {
                hunger,
                happiness,
                mood: computeMood(hunger, state.sleep, state.energy, happiness),
                feedback: {
                  message: 'Yum! Tasty milk',
                  emoji: '🍼',
                  id: Date.now(),
                },
              };
            }
            case 'sleep': {
              const sleep = clamp(state.sleep + 40);
              const energy = clamp(state.energy + 25);
              const happiness = clamp(state.happiness + 5);
              return {
                sleep,
                energy,
                happiness,
                mood: computeMood(state.hunger, sleep, energy, happiness),
                feedback: {
                  message: 'Sweet dreams!',
                  emoji: '😴',
                  id: Date.now(),
                },
              };
            }
            case 'bath': {
              const happiness = clamp(state.happiness + 20);
              const energy = clamp(state.energy - 5);
              return {
                happiness,
                energy,
                mood: computeMood(state.hunger, state.sleep, energy, happiness),
                feedback: {
                  message: 'Splash splash! All clean',
                  emoji: '🛁',
                  id: Date.now(),
                },
              };
            }
            case 'camera': {
              const happiness = clamp(state.happiness + 3);
              return {
                happiness,
                mood: computeMood(
                  state.hunger,
                  state.sleep,
                  state.energy,
                  happiness
                ),
                feedback: {
                  message: 'Say cheese!',
                  emoji: '📸',
                  id: Date.now(),
                },
              };
            }
            default:
              return {};
          }
        }),

      setActiveModal: (modal) => set({ activeModal: modal }),
      clearFeedback: () => set({ feedback: null }),

      tick: (deltaSeconds) =>
        set((state) => {
          const hunger = clamp(state.hunger - DECAY_RATES.hunger * deltaSeconds);
          const sleep = clamp(state.sleep - DECAY_RATES.sleep * deltaSeconds);
          const energy = clamp(state.energy - DECAY_RATES.energy * deltaSeconds);
          const happiness = clamp(
            state.happiness - DECAY_RATES.happiness * deltaSeconds
          );
          const mood = computeMood(hunger, sleep, energy, happiness);
          return { hunger, sleep, energy, happiness, mood };
        }),

      reset: () =>
        set({ ...initialCore, scene: 'landing', activeModal: null, feedback: null }),
    }),
    {
      name: 'babyverse-save',
      version: 2,
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
