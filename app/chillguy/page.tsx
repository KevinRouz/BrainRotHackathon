'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdvicePage() {
  const router = useRouter();
  const [problem, setProblem] = useState('');
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/chillguy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem, history }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate advice');
      }

      const data = await response.json();

      // Update the conversation history
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: problem },
        { role: 'assistant', content: data.advice },
      ]);
      setProblem('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-white text-center"
      >
        Chill Guy Therapy
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 flex flex-col"
      >
        <div className="flex-grow overflow-y-auto max-h-[70vh] scrollbar-hide">
          {history.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <img
                  src="/chill-guy.png"
                  alt="Chill Guy"
                  className="w-8 h-8 rounded-full mr-3 self-start"
                />
              )}
              <div
                className={`p-3 rounded-lg max-w-xs text-white ${
                  msg.role === 'user'
                    ? 'bg-purple-500 text-right'
                    : 'bg-pink-500 text-left'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center mt-4">
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="flex-grow p-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 resize-none"
            placeholder="What's on your mind?"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-2 p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            {loading ? '...' : 'Enter'}
          </button>
        </form>
      </motion.div>

      <button
        onClick={() => router.push('/home')}
        className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
}