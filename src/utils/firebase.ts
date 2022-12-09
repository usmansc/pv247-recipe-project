import { initializeApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	doc,
	getFirestore
} from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	User
} from 'firebase/auth';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyBqhvI73BUJNJYZJloUoljLIt_5ROv-ssE',
	authDomain: 'pv247-recipe-project.firebaseapp.com',
	projectId: 'pv247-recipe-project',
	storageBucket: 'pv247-recipe-project.appspot.com',
	messagingSenderId: '873032373311',
	appId: '1:873032373311:web:da89f20bbb97f6236ad48a'
});

export type Amount = {
	id: string;
	ingredient: string;
	value: number;
	unit: string;
};

export type Ingredient = {
	id: string;
	recipe: string;
	name: string;
	amount: Amount;
};

export type Tag = {
	id: string;
	name: string;
};

export type Recipe = {
	id: string;
	user: string;
	name: string;
	description: string;
	tags: Tag[];
	image: string;
	ingredients: Ingredient[];
};

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

export const amountsCollection = collection(
	db,
	'amounts'
) as CollectionReference<Amount>;

export const ingredientsCollection = collection(
	db,
	'ingredients'
) as CollectionReference<Ingredient>;

export const tagsCollection = collection(
	db,
	'tags'
) as CollectionReference<Tag>;

export const recipesCollection = collection(
	db,
	'recipes'
) as CollectionReference<Recipe>;

export const favoritesCollection = collection(
	db,
	'favorites'
) as CollectionReference;

export const favoritesDocument = (userId: string) =>
	doc(db, 'favorites', userId);
