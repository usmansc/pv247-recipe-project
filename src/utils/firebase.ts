import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as authSignOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import {
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    getFirestore,
    Timestamp
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
    apiKey: "AIzaSyBqhvI73BUJNJYZJloUoljLIt_5ROv-ssE",
    authDomain: "pv247-recipe-project.firebaseapp.com",
    projectId: "pv247-recipe-project",
    storageBucket: "pv247-recipe-project.appspot.com",
    messagingSenderId: "873032373311",
    appId: "1:873032373311:web:da89f20bbb97f6236ad48a"
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
    onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();