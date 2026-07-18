import { motion } from 'framer-motion';
import { FiPlay, FiSettings, FiInfo, FiHeart } from 'react-icons/fi';
import { Button } from '../components/UI/Button';
import { AnimatedBackground } from '../components/Effects/AnimatedBackground';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../assets/sounds/soundManager';

export function LandingPage() {
  const setScene = useGameStore((s) => s.setScene);

  const go = (scene: 'game' | 'settings' | 'about') => {
    soundManager.unlock();
    setScene(scene);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 flex max-w-2xl flex-col items-center text-center"
      >
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-sm font-semibold text-blush-500 shadow-soft backdrop-blur-md"
        >
          <FiHeart className="animate-breathe" /> Welcome to your cozy baby world
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 160, damping: 18 }}
          className="text-gradient text-7xl font-bold tracking-tight sm:text-8xl md:text-9xl"
          style={{ lineHeight: 1.05 }}
        >
          BabyVerse
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-5 max-w-md text-lg font-medium text-ink-600 sm:text-xl"
        >
          Take care of your own little virtual baby.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            variant="primary"
            icon={<FiPlay />}
            onClick={() => go('game')}
            className="min-w-[180px]"
          >
            Start Playing
          </Button>
          <Button
            size="lg"
            variant="glass"
            icon={<FiSettings />}
            onClick={() => go('settings')}
          >
            Settings
          </Button>
          <Button
            size="lg"
            variant="glass"
            icon={<FiInfo />}
            onClick={() => go('about')}
          >
            About
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 flex items-center gap-6 text-sm text-ink-500"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mint-400" /> Plays offline
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" /> No account needed
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blush-400" /> Saves automatically
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
