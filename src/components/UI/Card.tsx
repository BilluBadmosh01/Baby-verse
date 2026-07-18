import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  glass?: boolean;
  hover?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ glass = true, hover = false, className, children, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={cn(
          'no-select rounded-4xl p-5',
          glass ? 'glass shadow-soft' : 'bg-white shadow-soft',
          className
        )}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
