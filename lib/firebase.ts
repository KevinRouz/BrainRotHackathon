import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBw_sWq_6W8pOW6iWU-8anEcOrpyXy2DhY",
  authDomain: "iunderstanditnow-139d6.firebaseapp.com",
  projectId: "iunderstanditnow-139d6",
  storageBucket: "iunderstanditnow-139d6.firebasestorage.app",
  messagingSenderId: "934380660628",
  appId: "1:934380660628:web:1f047513de50f87eeed181",
  measurementId: "G-8YDMWHTFV9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

