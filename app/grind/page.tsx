'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../components/Button';

export default function LockedInPage() {
  const router = useRouter();

  const [videoSrc, setVideoSrc] = useState('/parkour.mp4');

  const handleVideoChange = (src: string) => {
    setVideoSrc(src);
  };

  const maxWidthClass = videoSrc === '/soap.mp4' ? 'max-w-full' : 'max-w-lg';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-white"
      >
        LockedIn
      </motion.h1>

      <div className="relative w-full mb-4">
        <video 
          src={videoSrc} 
          autoPlay 
          muted 
          loop 
          className={`w-full ${maxWidthClass} h-auto object-cover mx-auto`}
          playsInline
        />
      </div>

      <div className="flex gap-4">
      <Button onClick={() => handleVideoChange('/parkour.mp4')} className="bg-red-500 hover:bg-red-600">Parkour</Button>
        <Button onClick={() => handleVideoChange('/subway.mp4')} className="bg-sky-400 hover:bg-sky-600">Subway Surfers</Button>
        <Button onClick={() => handleVideoChange('/soap.mp4')} className="bg-yellow-500 hover:bg-yellow-600">Soap Cutting</Button>
        <Button onClick={() => handleVideoChange('/rug.mp4')} className="bg-purple-500 hover:bg-purple-600">Rug Cleaning</Button>
        <Button onClick={() => handleVideoChange('/build.mp4')} className="bg-orange-500 hover:bg-orange-600">House Building</Button>
        <Button onClick={() => handleVideoChange('/slime.mp4')} className="bg-pink-500 hover:bg-pink-600">Slime</Button>
      </div>

      <Button 
        onClick={() => router.push('/home')} 
        className="mt-8 bg-blue-600 hover:bg-blue-700 hover:text-white transition-colors"
      >
        Back to Home
      </Button>
    </div>
  );
}
