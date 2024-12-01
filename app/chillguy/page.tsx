// app/advice/page.tsx
'use client'

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

export default function AdvicePage() {
  const router = useRouter();
  const [problem, setProblem] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/chillguy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate advice');
      }

      const data = await response.json();
      setAdvice(data.advice);

      // Create and play audio
      if (audioRef.current) {
        audioRef.current.src = `data:audio/mpeg;base64,${data.audioContent}`;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-white"
      >
        Voice Advice
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">What's on your mind?</h2>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
          placeholder="Tell me what you need advice about..."
          rows={4}
        />
        <Button 
          onClick={handleSubmit} 
          disabled={loading || !problem.trim()} 
          className="w-full bg-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
        >
          {loading ? 'Generating...' : 'Get Advice'}
        </Button>

        {advice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <h3 className="text-xl font-bold mb-2 text-white">Advice:</h3>
            <div className="bg-white bg-opacity-20 p-4 rounded mb-4 text-white whitespace-pre-wrap">
              {advice}
            </div>
          </motion.div>
        )}

        <audio ref={audioRef} className="hidden" />
      </motion.div>

      <Button 
        onClick={() => router.push('/home')} 
        className="mt-8 bg-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
      >
        Back to Home
      </Button>
    </div>
  );
}
