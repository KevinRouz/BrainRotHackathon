'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../components/Button';

export default function LockedInPage() {
  const router = useRouter();

  // State to manage the currently playing video
  const [videoSrc, setVideoSrc] = useState('/parkour.mp4');

  // Function to handle video change based on the selected button
  const handleVideoChange = (src: string) => {
    setVideoSrc(src);
  };

  // Determine the max-width class based on the selected video
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

      {/* Video player */}
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

      {/* Buttons to change the video */}
      <div className="flex gap-4">
        <Button onClick={() => handleVideoChange('/parkour.mp4')} className="bg-green-500 hover:bg-green-600">Parkour</Button>
        <Button onClick={() => handleVideoChange('/subway.mp4')} className="bg-blue-400 hover:bg-blue-600">Subway Surfers</Button>
        <Button onClick={() => handleVideoChange('/soap.mp4')} className="bg-yellow-500 hover:bg-yellow-600">Soap Cutting</Button>
        <Button onClick={() => handleVideoChange('/rug.mp4')} className="bg-purple-500 hover:bg-purple-600">Rug Cleaning</Button>
      </div>

      {/* Navigation Button */}
      <Button 
        onClick={() => router.push('/home')} 
        className="mt-8 bg-blue-600 hover:bg-blue-700 hover:text-white transition-colors"
      >
        Back to Home
      </Button>
    </div>
  );
}
