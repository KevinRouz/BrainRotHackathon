'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import Card from './components/Card';
import { useAuth } from '../hooks/useAuth';
import Button from './components/Button';

const cards = [
  { title: 'Brain Nourishment', gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', image: '../media/chill-guy.png', route: '/rotucate' },
  { title: 'Rizzlator6000', gradient: 'bg-gradient-to-br from-blue-500 to-teal-500', image: '/placeholder.svg?height=270&width=480', route: '/rizzlator6000' },
  { title: 'PolloDF', gradient: 'bg-gradient-to-br from-yellow-500 to-red-500', image: '/placeholder.svg?height=270&width=480', route: '/pollodf' },
  { title: 'LockedIn', gradient: 'bg-gradient-to-br from-green-500 to-blue-500', image: '/placeholder.svg?height=270&width=480', route: '/lockedin' },
  { title: 'We\'re Chill Guys', gradient: 'bg-gradient-to-br from-red-500 to-blue-500', image: '/placeholder.svg?height=270&width=480', route: '/chillguy' },
  { title: 'Grind Session', gradient: 'bg-gradient-to-br from-green-500 to-yellow-500', image: '/placeholder.svg?height=270&width=480', route: '/grind' },
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
      <div className="flex flex-col items-center justify-start min-h-screen h-screen px-4 py-8 relative">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
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
          className="mt-4"
        >
          <Button onClick={logOut}>Sign Out</Button>
        </motion.div>
        
      </div>
    </Layout>
  );
}


