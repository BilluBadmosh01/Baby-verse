import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  icon?: ReactNode;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  icon,
  colorFrom = '#ff85a3',
  colorTo = '#ffc861',
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || icon) && (
        <div className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink-700">
          <span className="flex items-center gap-1.5">
            {icon}
            {label}
          </span>
          <span className="tabular-nums text-ink-500">{Math.round(pct)}%</span>
        </div>
      )}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-ink-400/15">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
            boxShadow: `0 0 12px -2px ${colorFrom}aa`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
