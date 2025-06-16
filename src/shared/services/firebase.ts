import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc1lU9hlJrL3250to7fbqSVhHnn8H-5GQ",
  authDomain: "agende-aqui-8e09f.firebaseapp.com",
  projectId: "agende-aqui-8e09f",
  storageBucket: "agende-aqui-8e09f.firebasestorage.app",
  messagingSenderId: "151263061297",
  appId: "1:151263061297:web:efc3292813c1b6aa7f3c10"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const firestore = getFirestore(app);
export const db: Firestore = firestore;