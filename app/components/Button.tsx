import { motion } from 'framer-motion';

interface ButtonProps {
  onClick?: (e: React.FormEvent) => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  ghost?: boolean;
  type?: 'submit' | 'button' | 'reset';  // Add this line
}


export default function Button({ 
  onClick, 
  children, 
  ghost = false, 
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
        ghost
          ? 'bg-transparent border-2 border-text-primary/30 hover:border-text-primary/60 text-text-primary'
          : 'bg-primary text-white hover:bg-primary/90'
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}


