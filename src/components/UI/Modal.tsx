import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FiX } from 'react-icons/fi';
import { cn } from '../../utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'glass relative z-10 w-full max-w-lg rounded-5xl p-6 shadow-soft-lg',
              className
            )}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="no-select grid h-9 w-9 place-items-center rounded-full bg-white/60 text-ink-600 transition hover:bg-blush-100 hover:text-blush-500"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
