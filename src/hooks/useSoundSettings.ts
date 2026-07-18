import { useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { soundManager } from '../assets/sounds/soundManager';

export function useSoundSettings() {
  const { soundEnabled, effectsVolume } = useSettingsStore();

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    soundManager.setEffectsVolume(effectsVolume);
  }, [effectsVolume]);
}
