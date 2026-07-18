import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiVolume2,
  FiVolumeX,
  FiZap,
} from 'react-icons/fi';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { AnimatedBackground } from '../components/Effects/AnimatedBackground';
import { useGameStore } from '../store/useGameStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { soundManager } from '../assets/sounds/soundManager';
import { cn } from '../utils/cn';

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => {
        onChange(!on);
        soundManager.play('click');
      }}
      className={cn(
        'no-select relative h-8 w-14 rounded-full transition-colors duration-300',
        on ? 'bg-mint-400' : 'bg-ink-400/30'
      )}
      aria-pressed={on}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'absolute top-1 h-6 w-6 rounded-full bg-white shadow-soft',
          on ? 'left-7' : 'left-1'
        )}
      />
    </button>
  );
}

function VolumeSlider({
  value,
  onChange,
  accent,
}: {
  value: number;
  onChange: (v: number) => void;
  accent: string;
}) {
  return (
    <input
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-ink-400/15 accent-blush-400"
      style={{ accentColor: accent }}
    />
  );
}

export function SettingsPage() {
  const setScene = useGameStore((s) => s.setScene);
  const {
    soundEnabled,
    musicVolume,
    effectsVolume,
    quality,
    setSoundEnabled,
    setMusicVolume,
    setEffectsVolume,
    setQuality,
    reset,
  } = useSettingsStore();

  return (
    <div className="relative min-h-screen px-6 py-12">
      <AnimatedBackground showBubbles={false} />

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-ink-900"
            >
              Settings
            </motion.h1>
            <p className="mt-1 text-ink-500">Make BabyVerse feel just right.</p>
          </div>
          <Button variant="glass" size="md" icon={<FiArrowLeft />} onClick={() => setScene('landing')}>
            Back
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush-100 text-blush-500">
                  {soundEnabled ? <FiVolume2 size={20} /> : <FiVolumeX size={20} />}
                </span>
                <div>
                  <p className="font-semibold text-ink-900">Sound Effects</p>
                  <p className="text-sm text-ink-500">Cute blips and feedback sounds</p>
                </div>
              </div>
              <Toggle on={soundEnabled} onChange={setSoundEnabled} />
            </div>
          </Card>

          <Card>
            <p className="mb-1 font-semibold text-ink-900">Music Volume</p>
            <p className="mb-3 text-sm text-ink-500">Background ambiance intensity</p>
            <VolumeSlider value={musicVolume} onChange={setMusicVolume} accent="#a696ff" />
            <p className="mt-1 text-right text-xs text-ink-400">{Math.round(musicVolume * 100)}%</p>
          </Card>

          <Card>
            <p className="mb-1 font-semibold text-ink-900">Effects Volume</p>
            <p className="mb-3 text-sm text-ink-500">Tap and interaction sounds</p>
            <VolumeSlider value={effectsVolume} onChange={setEffectsVolume} accent="#ff85a3" />
            <p className="mt-1 text-right text-xs text-ink-400">{Math.round(effectsVolume * 100)}%</p>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-100 text-sky-500">
                <FiZap size={20} />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-ink-900">Graphics Quality</p>
                <p className="text-sm text-ink-500">Balance detail and performance</p>
              </div>
              <div className="flex gap-2">
                {(['low', 'high'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuality(q);
                      soundManager.play('click');
                    }}
                    className={cn(
                      'no-select rounded-2xl px-4 py-2 text-sm font-semibold capitalize transition',
                      quality === q
                        ? 'bg-sky-400 text-white shadow-soft'
                        : 'bg-white/60 text-ink-600 hover:bg-white/90'
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-ink-900">Reset Progress</p>
                <p className="text-sm text-ink-500">Clear your baby and saved settings</p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  reset();
                  useGameStore.getState().reset();
                  setScene('landing');
                }}
              >
                Reset
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
