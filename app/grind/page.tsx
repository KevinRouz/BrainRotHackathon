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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 p-8 relative">
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('/lonewolf.png')" }}></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex gap-8 items-center relative z-10"
      >
        {/* Sidebar Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => handleVideoChange('/parkour.mp4')}
            className="glass-button"
          >
            Parkour
          </Button>
          <Button
            onClick={() => handleVideoChange('/subway.mp4')}
            className="glass-button"
          >
            Subway Surfers
          </Button>
          <Button
            onClick={() => handleVideoChange('/soap.mp4')}
            className="glass-button"
          >
            Soap Cutting
          </Button>
          <Button
            onClick={() => handleVideoChange('/rug.mp4')}
            className="glass-button"
          >
            Rug Cleaning
          </Button>
          <Button
            onClick={() => handleVideoChange('/build.mp4')}
            className="glass-button"
          >
            House Building
          </Button>
          <Button
            onClick={() => handleVideoChange('/slime.mp4')}
            className="glass-button"
          >
            Slime
          </Button>
          <Button
            onClick={() => router.push('/home')}
            className="glass-button bg-red-500 text-white"
          >
            Back to Home
          </Button>
        </div>

        {/* Video Section */}
        <div className="relative max-w-xs w-full">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            playsInline
          />
        </div>
      </motion.div>

      {/* Styles for Glassmorphism */}
      <style jsx>{`
        .glass-button {
          background: rgba(255, 255, 255, 0.1); /* More transparent */
          backdrop-filter: blur(10px); /* Slight blur effect */
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          text-align: center;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.3); /* Slightly more visible on hover */
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
