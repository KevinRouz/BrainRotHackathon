import { motion } from 'framer-motion';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  ghost?: boolean;
}

export default function Button({ onClick, children, ghost = false }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
        ghost
          ? 'bg-transparent border-2 border-text-primary/30 hover:border-text-primary/60 text-text-primary'
          : 'bg-primary text-white hover:bg-primary/90'
      }`}
    >
      {children}
    </motion.button>
  );
}

