import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface NeonButtonProps extends MotionProps {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NeonButton({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  ...motionProps
}: NeonButtonProps) {
  const baseClasses =
    'px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2';

  const variants = {
    primary: 'btn-primary-neon neon-glow',
    outline: 'btn-neon',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
