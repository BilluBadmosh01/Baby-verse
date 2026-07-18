import { motion, type HTMLMotionProps, type EventInfo } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { soundManager } from '../../assets/sounds/soundManager';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children' | 'onHoverStart'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children?: ReactNode;
  onHoverStart?: (event: MouseEvent, info: EventInfo) => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-blush-400 to-blush-500 text-white shadow-soft hover:shadow-glow',
  secondary:
    'bg-gradient-to-br from-sky-300 to-sky-400 text-ink-900 shadow-soft hover:shadow-soft-lg',
  ghost: 'bg-white/40 text-ink-800 hover:bg-white/70 backdrop-blur-sm',
  glass: 'glass text-ink-800 hover:bg-white/70 shadow-soft',
  danger:
    'bg-gradient-to-br from-blush-400 to-blush-500 text-white shadow-soft hover:shadow-glow',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-base rounded-2xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-3xl gap-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      fullWidth,
      className,
      children,
      onClick,
      onHoverStart,
      ...rest
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        onHoverStart={(e, info) => {
          soundManager.play('hover');
          onHoverStart?.(e, info);
        }}
        onClick={(e) => {
          soundManager.play('click');
          onClick?.(e);
        }}
        className={cn(
          'no-select inline-flex items-center justify-center font-semibold tracking-tight',
          'transition-shadow duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blush-200',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...rest}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
