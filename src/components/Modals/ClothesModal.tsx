import { motion } from 'framer-motion';
import { FiCheck, FiShuffle } from 'react-icons/fi';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { useGameStore } from '../../store/useGameStore';
import { CLOTHES_CATALOG } from '../../data/catalogs';
import type { ClothingSlot } from '../../types';
import { cn } from '../../utils/cn';

const slotLabels: Record<ClothingSlot, string> = {
  onesie: 'Onesies',
  hat: 'Hats',
  shoes: 'Shoes',
};

const slotColors: Record<ClothingSlot, string> = {
  onesie: 'from-blush-300 to-blush-400',
  hat: 'from-sky-300 to-sky-400',
  shoes: 'from-sun-300 to-sun-400',
};

const slotIcon: Record<ClothingSlot, string> = {
  onesie: '👶',
  hat: '🎩',
  shoes: '👟',
};

export function ClothesModal() {
  const activeModal = useGameStore((s) => s.activeModal);
  const setActiveModal = useGameStore((s) => s.setActiveModal);
  const selectedClothes = useGameStore((s) => s.selectedClothes);
  const equipClothing = useGameStore((s) => s.equipClothing);
  const unequipClothing = useGameStore((s) => s.unequipClothing);

  const slots: ClothingSlot[] = ['onesie', 'hat', 'shoes'];

  return (
    <Modal
      open={activeModal === 'clothes'}
      onClose={() => setActiveModal(null)}
      title="Dress Up Baby"
    >
      <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto scrollbar-none pr-1">
        {slots.map((slot) => {
          const items = CLOTHES_CATALOG.filter((c) => c.slot === slot);
          const equipped = selectedClothes.find((c) => c.slot === slot);
          return (
            <div key={slot}>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-2xl bg-gradient-to-br text-white text-sm',
                    slotColors[slot]
                  )}
                >
                  {slotIcon[slot]}
                </span>
                <h4 className="font-semibold text-ink-900">{slotLabels[slot]}</h4>
                {equipped && (
                  <button
                    onClick={() => unequipClothing(slot)}
                    className="ml-auto flex items-center gap-1 text-xs font-medium text-ink-500 transition hover:text-blush-500"
                  >
                    <FiShuffle size={12} /> Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {items.map((item) => {
                  const isEquipped = equipped?.id === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => equipClothing(item)}
                      className={cn(
                        'relative flex flex-col items-center gap-2 rounded-3xl p-3 transition',
                        isEquipped
                          ? 'bg-blush-100 ring-2 ring-blush-400'
                          : 'bg-white/60 hover:bg-white/90'
                      )}
                    >
                      {isEquipped && (
                        <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-blush-400 text-white">
                          <FiCheck size={12} />
                        </span>
                      )}
                      <span
                        className={cn(
                          'grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-xl text-white shadow-sm',
                          slotColors[slot]
                        )}
                      >
                        {slotIcon[slot]}
                      </span>
                      <span className="text-center text-xs font-medium text-ink-700">
                        {item.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
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
