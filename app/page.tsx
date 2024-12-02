'use client'

// import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  // const { user, loading } = useAuth();
  router.push('/home');
  // useEffect(() => {
  //   if (!loading) {
  //     if (user) {
  //       router.push('/home');
  //     } else {
  //       router.push('/home');
  //     }
  //   }
  // }, [user, loading, router]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return null;
}
