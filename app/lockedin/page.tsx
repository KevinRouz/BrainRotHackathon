'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

type PostType = 'Promoting a product' | 'Talking about my journey' | 'An event that I went to' | 'Other';
type Experience = 'Student (0 years)' | 'New Grad (0-2 years)' | 'Early Career (3-5 years)' | 'Mid Career (6-10 years)' | 'Senior (10+ years)';

export default function LockedInPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState<PostType>('Promoting a product');
  const [experience, setExperience] = useState<Experience>('Student (0 years)');
  const [field, setField] = useState('');
  const [isB2B, setIsB2B] = useState(false);
  const [topic, setTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/lockedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postType, experience, field, isB2B, topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate post');
      }

      const data = await response.json();
      setGeneratedPost(data.post);
      setStep(6);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">What kind of post is this?</h2>
            {(['Promoting a product', 'Talking about my journey', 'An event that I went to', 'Other'] as PostType[]).map((type) => (
              <Button
                key={type}
                onClick={() => { setPostType(type); setStep(2); }}
                className="mb-2 w-full bg-blue-700 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors"
              >
                {type}
              </Button>
            ))}
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">How much experience do you have?</h2>
            {(['Student (0 years)', 'New Grad (0-2 years)', 'Early Career (3-5 years)', 'Mid Career (6-10 years)', 'Senior (10+ years)'] as Experience[]).map((exp) => (
              <Button
                key={exp}
                onClick={() => { setExperience(exp); setStep(3); }}
                className="mb-2 w-full bg-blue-700 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors"
              >
                {exp}
              </Button>
            ))}
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">What is your field? (optional)</h2>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
              placeholder="Enter your field"
            />
            <Button onClick={() => setStep(4)} className="w-full bg-blue-700 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors">
              Next
            </Button>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Do you want to relate this to B2B sales?</h2>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isB2B}
                onChange={(e) => setIsB2B(e.target.checked)}
                className="mr-2"
              />
              <label>Yes, relate to B2B sales</label>
            </div>
            <Button onClick={() => setStep(5)} className="w-full bg-blue-700 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors">
              Next
            </Button>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">What do you want to talk about?</h2>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
              placeholder="Enter your topic"
              rows={4}
            />
            <Button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-700 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors">
              {loading ? 'Generating...' : 'Generate LinkedIn Post'}
            </Button>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Generated LinkedIn Post</h2>
            <div className="bg-white bg-opacity-20 p-4 rounded mb-4 whitespace-pre-wrap">
              {generatedPost}
            </div>
            <Button onClick={() => setStep(1)} className="w-full bg-blue-700 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors">
              Create Another Post
            </Button>
          </>
        );
      default:
        return null;
    }
  };

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
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8"
      >
        {renderStep()}
      </motion.div>
      <Button 
        onClick={() => router.push('/home')} 
        className="mt-8 bg-blue-800 hover:bg-blue-900 hover:text-white transition-colors"
      >
        Back to Home
      </Button>
    </div>
  );
}

