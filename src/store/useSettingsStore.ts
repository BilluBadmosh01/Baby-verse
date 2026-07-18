import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameSettings } from '../types';

interface SettingsState extends GameSettings {
  setSoundEnabled: (enabled: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setEffectsVolume: (volume: number) => void;
  setQuality: (quality: GameSettings['quality']) => void;
  reset: () => void;
}

const defaults: GameSettings = {
  soundEnabled: true,
  musicVolume: 0.5,
  effectsVolume: 0.7,
  quality: 'high',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setMusicVolume: (musicVolume) => set({ musicVolume }),
      setEffectsVolume: (effectsVolume) => set({ effectsVolume }),
      setQuality: (quality) => set({ quality }),
      reset: () => set({ ...defaults }),
    }),
    {
      name: 'babyverse-settings',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
