import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { useGameStore } from './store/useGameStore';
import { useSoundSettings } from './hooks/useSoundSettings';
import type { SceneName } from './types';

const scenePages: Record<SceneName, React.ComponentType> = {
  landing: LandingPage,
  game: GamePage,
  settings: SettingsPage,
  about: AboutPage,
};

const transitionVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export default function App() {
  useSoundSettings();
  const scene = useGameStore((s) => s.scene);
  const Page = scenePages[scene];

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={scene}
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="relative min-h-screen w-full"
      >
        <Page />
      </motion.main>
    </AnimatePresence>
  );
}
