'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { useAuth } from '../../hooks/useAuth';
import Button from '../components/Button';

///placeholder.svg?height=270&width=480
const cards = [
  { title: 'Brain Nourishment', description: "Education, the ocky way.", gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', image: '/twoguys.png', route: '/rotucate' },
  { title: 'Rizzlator6000', description: 'Skibidi rizzify your messages.', gradient: 'bg-gradient-to-br from-blue-500 to-teal-500', image: 'rizz.png', route: '/rizzlator6000' },
  { title: 'PolloDF', description: 'Call upon Don Pollo to brainrotify your PDFs.', gradient: 'bg-gradient-to-br from-yellow-500 to-red-500', image: 'pollo.png', route: '/pollodf' },
  { title: 'LockedIn', description: `GYATT, that's a bussin LinkedIn post... AMBATAKUM`, gradient: 'bg-gradient-to-br from-green-500 to-blue-500', image: '', route: '/lockedin' },
  { title: 'We\'re Chill Guys', description: 'I\'m just a chill guy, what more is there to say?', gradient: 'bg-gradient-to-br from-red-500 to-blue-500', image: '/chill-guy.png', route: '/chillguy' },
  { title: 'Grind Session', description: 'Lock in with some brainrot stimulation.', gradient: 'bg-gradient-to-br from-green-500 to-yellow-500', image: '', route: '/grind' },
];

export default function HomePage() {
  const router = useRouter();
  const { user, loading, logOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen h-screen px-4 py-8 relative mt-[3%]">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          Hello, {user.firstName}!
        </motion.h1>
        <div className="grid grid-cols-3 gap-8 w-full max-w-8xl">
          {cards.map((card, index) => (
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

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20"
        >
          <Button onClick={logOut}>Sign Out</Button>
        </motion.div>
        
      </div>
    </Layout>
  );
}

