import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { soundManager } from '../assets/sounds/soundManager';
import { useSoundSettings } from './useSoundSettings';

export function useGameLoop() {
  useSoundSettings();
  const tick = useGameStore((s) => s.tick);
  const feedback = useGameStore((s) => s.feedback);
  const clearFeedback = useGameStore((s) => s.clearFeedback);
  const lastTick = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTick.current) / 1000;
      lastTick.current = now;
      tick(delta);
    }, 3000);

    return () => clearInterval(interval);
  }, [tick]);

  useEffect(() => {
    if (!feedback) return;
    soundManager.play('success');
    const timer = setTimeout(() => clearFeedback(), 2800);
    return () => clearTimeout(timer);
  }, [feedback, clearFeedback]);

  const { soundEnabled, effectsVolume } = useSettingsStore();
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);
  useEffect(() => {
    soundManager.setEffectsVolume(effectsVolume);
  }, [effectsVolume]);
}
