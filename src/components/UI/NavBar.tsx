import { motion } from 'framer-motion';
import {
  FiCoffee,
  FiGift,
  FiBox,
  FiDroplet,
  FiMoon,
  FiCamera,
  FiSettings,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { soundManager } from '../../assets/sounds/soundManager';
import { cn } from '../../utils/cn';

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
  color: string;
}

const items: NavItem[] = [
  { id: 'feed', label: 'Feed', icon: FiCoffee, color: 'from-blush-300 to-blush-400' },
  { id: 'clothes', label: 'Clothes', icon: FiGift, color: 'from-sky-300 to-sky-400' },
  { id: 'toys', label: 'Toys', icon: FiBox, color: 'from-sun-300 to-sun-400' },
  { id: 'bath', label: 'Bath', icon: FiDroplet, color: 'from-mint-300 to-mint-400' },
  { id: 'sleep', label: 'Sleep', icon: FiMoon, color: 'from-lavender-300 to-lavender-400' },
  { id: 'camera', label: 'Camera', icon: FiCamera, color: 'from-cream-300 to-cream-400' },
  { id: 'settings', label: 'Settings', icon: FiSettings, color: 'from-ink-400 to-ink-500' },
];

export function NavBar() {
  return (
    <motion.nav
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 26, delay: 0.2 }}
      className="glass fixed inset-x-0 bottom-3 z-30 mx-auto flex max-w-3xl items-center justify-between gap-1 rounded-4xl p-2 shadow-soft-lg sm:bottom-5 sm:gap-2 sm:p-3"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => soundManager.play('click')}
            onMouseEnter={() => soundManager.play('hover')}
            className={cn(
              'no-select group relative flex flex-1 flex-col items-center gap-1 rounded-3xl px-1 py-2 transition-colors sm:px-2'
            )}
            aria-label={item.label}
          >
            <motion.span
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className={cn(
                'grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-sm sm:h-11 sm:w-11 sm:rounded-3xl',
                item.color
              )}
            >
              <Icon size={18} />
            </motion.span>
            <span className="text-[10px] font-medium text-ink-600 transition-colors group-hover:text-ink-900 sm:text-xs">
              {item.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}
