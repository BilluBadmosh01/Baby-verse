import { motion } from 'framer-motion';
import {
  FiSmile,
  FiCoffee,
  FiMoon,
  FiZap,
  FiHeart,
} from 'react-icons/fi';
import { ProgressBar } from './ProgressBar';
import { useGameStore } from '../../store/useGameStore';
import type { Mood } from '../../types';
import { cn } from '../../utils/cn';

const moodLabel: Record<Mood, string> = {
  happy: 'Happy',
  sleepy: 'Sleepy',
  hungry: 'Hungry',
  playful: 'Playful',
  sad: 'Sad',
  excited: 'Excited',
};

const moodEmoji: Record<Mood, string> = {
  happy: '😊',
  sleepy: '😴',
  hungry: '🍼',
  playful: '🤸',
  sad: '🥲',
  excited: '🤩',
};

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorFrom: string;
  colorTo: string;
  delay: number;
}

function StatRow({ icon, label, value, colorFrom, colorTo, delay }: StatRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 24 }}
    >
      <ProgressBar
        value={value}
        label={label}
        icon={icon}
        colorFrom={colorFrom}
        colorTo={colorTo}
      />
    </motion.div>
  );
}

export function InfoPanel({ className }: { className?: string }) {
  const { mood, hunger, sleep, energy, happiness } = useGameStore();

  return (
    <div
      className={cn(
        'glass flex flex-col gap-5 rounded-5xl p-5 shadow-soft',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-ink-900">Baby Status</h3>
        <span className="rounded-full bg-blush-100 px-3 py-1 text-xs font-semibold text-blush-500">
          Live
        </span>
      </div>

      <div className="flex items-center gap-4 rounded-4xl bg-white/50 p-4">
        <motion.div
          className="grid h-14 w-14 place-items-center rounded-3xl bg-gradient-to-br from-blush-200 to-sun-200 text-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>{moodEmoji[mood]}</span>
        </motion.div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Mood</p>
          <p className="text-2xl font-semibold text-ink-900">{moodLabel[mood]}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <StatRow
          icon={<FiCoffee />}
          label="Hunger"
          value={hunger}
          colorFrom="#ff85a3"
          colorTo="#ffc91f"
          delay={0.05}
        />
        <StatRow
          icon={<FiMoon />}
          label="Sleep"
          value={sleep}
          colorFrom="#a696ff"
          colorTo="#7cc4ff"
          delay={0.1}
        />
        <StatRow
          icon={<FiZap />}
          label="Energy"
          value={energy}
          colorFrom="#7cc4ff"
          colorTo="#4fd98c"
          delay={0.15}
        />
        <StatRow
          icon={<FiHeart />}
          label="Happiness"
          value={happiness}
          colorFrom="#ff85a3"
          colorTo="#ff5c87"
          delay={0.2}
        />
      </div>

      <div className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-mint-100 py-2 text-sm font-medium text-mint-500">
        <FiSmile /> All needs satisfied
      </div>
    </div>
  );
}
