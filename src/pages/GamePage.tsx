import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { BabyCanvas } from '../components/Rooms/BabyCanvas';
import { InfoPanel } from '../components/UI/InfoPanel';
import { NavBar } from '../components/UI/NavBar';
import { useGameStore } from '../store/useGameStore';

export function GamePage() {
  const setScene = useGameStore((s) => s.setScene);
  const gender = useGameStore((s) => s.gender);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-100 via-cream-100 to-blush-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-blush-200/40 blur-3xl" />
        <div className="absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScene('landing')}
        className="no-select absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-2xl bg-white/60 px-4 py-2 font-semibold text-ink-700 shadow-soft backdrop-blur-md transition hover:bg-white/80"
      >
        <FiArrowLeft /> Home
      </motion.button>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 pb-32 pt-20 lg:flex-row lg:items-stretch lg:px-8 lg:pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative flex-1 overflow-hidden rounded-5xl bg-white/30 shadow-soft backdrop-blur-sm"
        >
          <BabyCanvas className="h-full min-h-[420px] w-full" />
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-ink-700 shadow-soft backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-mint-400" />
            {gender === 'girl' ? 'Baby Girl' : 'Baby Boy'}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 26 }}
          className="w-full shrink-0 lg:w-80 xl:w-96"
        >
          <InfoPanel className="h-full" />
        </motion.aside>
      </div>

      <NavBar />
    </div>
  );
}
