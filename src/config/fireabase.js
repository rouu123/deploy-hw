// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDhjqDai03fJpDDLxEdj3hO_yj3b5Mx9B4',
	authDomain: 'react-firebase-expense-t-2f00e.firebaseapp.com',
	projectId: 'react-firebase-expense-t-2f00e',
	storageBucket: 'react-firebase-expense-t-2f00e.appspot.com',
	messagingSenderId: '279508828702',
	appId: '1:279508828702:web:394c3517ad21f80e35e40f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
