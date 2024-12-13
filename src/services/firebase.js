// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDNqWm36_euQfdExWuI7BTcoI1YMoQin3Q",
  authDomain: "social-7727c.firebaseapp.com",
  projectId: "social-7727c",
  storageBucket: "social-7727c.firebasestorage.app",
  messagingSenderId: "336666494848",
  appId: "1:336666494848:web:123b0f25b28ecf8cf9a365",
  measurementId: "G-3PYYLZTDGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
