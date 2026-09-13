import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function FeedbackToast() {
  const feedback = useGameStore((s) => s.feedback);

  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          key={feedback.id}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="glass pointer-events-none absolute left-1/2 top-16 z-40 flex -translate-x-1/2 items-center gap-3 rounded-3xl px-5 py-3 shadow-soft-lg"
        >
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            {feedback.emoji}
          </motion.span>
          <span className="text-sm font-semibold text-ink-800">
            {feedback.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
