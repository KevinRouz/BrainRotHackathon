'use client'

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Card from '../components/Card';
// import { useAuth } from '../../hooks/useAuth';
import Button from '../components/Button';

const cards = [
  { title: 'Brain Nourishment', description: "Education, the ocky way.", gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', image: '/twoguys.png', route: '/rotucate' },
  { title: 'Rizzlator6000', description: 'Skibidi rizzify your messages.', gradient: 'bg-gradient-to-br from-blue-500 to-teal-500', image: 'rizz.png', route: '/rizzlator6000' },  
  { title: 'Grind Session', description: 'Lock in with some brainrot stimulation.', gradient: 'bg-gradient-to-br from-green-500 to-yellow-500', image: '/monke.png', route: '/grind' },
  { title: 'Chill Guy Therapy', description: 'When you just need some chill advice from a chill guy.', gradient: 'bg-gradient-to-br from-red-500 to-blue-500', image: '/chill-guy.png', route: '/chillguy' },
  { title: 'LockedIn', description: `GYATT, that's a bussin LinkedIn post... AMBATAKUM`, gradient: 'bg-gradient-to-br from-green-500 to-blue-500', image: '/lockedin.png', route: '/lockedin' },
];

export default function HomePage() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-screen px-4 py-8 relative bg-gradient-to-br from-gray-400 to-gray-200">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500"
      >
        Hello, rizzler!
      </motion.h1>
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {cards.slice(0, 3).map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card {...card} />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-8 mx-auto w-full max-w-7xl">
          {cards.slice(3).map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card {...card} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-20"
      >
        {/* <Button onClick={logOut} className="bg-blue-600 hover:bg-blue-700">Sign Out</Button> */}
      </motion.div>
    </div>
  );
}
