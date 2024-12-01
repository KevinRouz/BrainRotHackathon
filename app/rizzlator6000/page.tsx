'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import { doc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function Rizzlator6000Page() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [rizzedResponse, setRizzedResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rizzlator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setRizzedResponse(data.answer || 'Sorry, I couldn\'t generate a rizzed response.');
    } catch (error) {
      console.error('Error:', error);
      setRizzedResponse('Oops! Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser || !prompt || !rizzedResponse || isSaving) return;

    setIsSaving(true);
    try {
      const timestamp = new Date().toISOString();
      const userDocRef = doc(db, 'Rizzlator', auth.currentUser.uid);
      const timestampCollectionRef = collection(userDocRef, timestamp);
      
      await setDoc(doc(timestampCollectionRef, 'data'), {
        prompt: prompt,
        rizzedResponse: rizzedResponse
      });

      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-white"
      >
        Rizzlator6000
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8"
      >
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your text to be rizzed up..."
            className="w-full p-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <div className="flex justify-center w-full">
            <Button 
              type="submit" 
              disabled={loading || !prompt}
              className="mt-4 w-full max-w-md bg-teal-500 text-teal-500 hover:bg-blue-500 hover:text-white transition-colors"
            >
              {loading ? 'Rizzifying...' : 'Get Rizzed Response'}
            </Button>
          </div>
        </form>
        {rizzedResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-20 rounded-lg p-6 text-white"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Rizzed Response:</h2>
            <div className="whitespace-pre-wrap">{rizzedResponse}</div>
          </motion.div>
        )}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            onClick={() => router.push('/home')} 
            className="bg-teal-500 text-teal-500 hover:bg-blue-500 hover:text-white transition-colors"
          >
            Back to Home
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-teal-500 text-teal-500 hover:bg-blue-500 hover:text-white transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
