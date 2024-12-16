// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBnoDHwZS2emgJx9UVWmLWJQQiK0OHbvAE",
    authDomain: "ai-transaction.firebaseapp.com",
    projectId: "ai-transaction",
    storageBucket: "ai-transaction.firebasestorage.app",
    messagingSenderId: "315607460239",
    appId: "1:315607460239:web:a1debd5230d7cf853e83fa",
    measurementId: "G-JPZ94NKG68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };