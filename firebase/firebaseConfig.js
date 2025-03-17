import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAYai12ElU9K5E0kQKX7BNz45Spj2j8sII",  // ✅ Fixed Typo (apiKey)
    authDomain: "e-commerce-4e9d6.firebaseapp.com",
    projectId: "e-commerce-4e9d6",
    storageBucket: "e-commerce-4e9d6.appspot.com", // ✅ Fixed Storage Bucket
    messagingSenderId: "148778708550",
    appId: "1:148778708550:web:e0570bfaf8c7691b162447",
    measurementId: "G-DNEEL4FEK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase initialized successfully!");

export { auth, db, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc };
