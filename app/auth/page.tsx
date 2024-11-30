'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useAuth } from '../../hooks/useAuth';

export default function AuthPage() {
  const router = useRouter();
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password, firstName, lastName);
      } else {
        await signIn(email, password);
      }
      router.push('/home');
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-surface p-8 rounded-lg shadow-xl backdrop-blur-lg bg-opacity-50 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-background bg-opacity-50 text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-background bg-opacity-50 text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-background bg-opacity-50 text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-background bg-opacity-50 text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={8}
                pattern="(?=.*\d).{8,}"
              />
              {isSignUp && (
                <p className="text-sm text-primary mt-1">
                  Password must be at least 8 characters long and include numbers.
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <Button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</Button>
            </div>
          </form>
          <p className="mt-4 text-center text-primary">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-primary hover:underline focus:outline-none"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
