import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { useGameStore } from '../../store/useGameStore';
import { TOY_CATALOG } from '../../data/catalogs';
import { cn } from '../../utils/cn';

const toyEmojis: Record<string, string> = {
  rattle: '🔔',
  teddy: '🧸',
  ball: '⚽',
  blocks: '🧱',
};

const toyColors: Record<string, string> = {
  rattle: 'from-sun-300 to-sun-400',
  teddy: 'from-blush-300 to-blush-400',
  ball: 'from-mint-300 to-mint-400',
  blocks: 'from-sky-300 to-sky-400',
};

export function ToysModal() {
  const activeModal = useGameStore((s) => s.activeModal);
  const setActiveModal = useGameStore((s) => s.setActiveModal);
  const selectedToy = useGameStore((s) => s.selectedToy);
  const selectToy = useGameStore((s) => s.selectToy);

  return (
    <Modal
      open={activeModal === 'toys'}
      onClose={() => setActiveModal(null)}
      title="Choose a Toy"
    >
      <p className="mb-4 text-sm text-ink-500">
        Pick a toy to play with your baby — it boosts happiness!
      </p>
      <div className="grid grid-cols-2 gap-4">
        {TOY_CATALOG.map((toy) => {
          const isSelected = selectedToy === toy.id;
          return (
            <motion.button
              key={toy.id}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => selectToy(toy.id)}
              className={cn(
                'relative flex flex-col items-center gap-3 rounded-4xl p-5 transition',
                isSelected
                  ? 'bg-sun-100 ring-2 ring-sun-400'
                  : 'bg-white/60 hover:bg-white/90'
              )}
            >
              {isSelected && (
                <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-sun-400 text-white">
                  <FiCheck size={14} />
                </span>
              )}
              <span
                className={cn(
                  'grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br text-3xl text-white shadow-soft',
                  toyColors[toy.id]
                )}
              >
                {toyEmojis[toy.id]}
              </span>
              <span className="font-semibold text-ink-800">{toy.name}</span>
            </motion.button>
          );
        })}
      </div>
      <div className="mt-5 flex justify-end">
        <Button variant="glass" size="sm" onClick={() => setActiveModal(null)}>
          Done
        </Button>
      </div>
    </Modal>
  );
}
