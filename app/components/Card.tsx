import { motion } from 'framer-motion';
import Link from 'next/link';

interface CardProps {
  title: string;
  gradient: string;
  image: string;
  route: string;
}

export default function Card({ title, gradient, image, route }: CardProps) {
  return (
    <Link href={route}>
      <motion.div
        className={`relative w-full aspect-video rounded-lg overflow-hidden ${gradient} shadow-lg transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          initial={{ opacity: 0.1 }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundImage: `url(${image})` }}
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-20"
          whileHover={{ opacity: 0 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
      </motion.div>
    </Link>
  );
}

