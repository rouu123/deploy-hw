// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the Firestore module
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMoPoRCNzyQCF7PEhBkOiAddlCDy1Ng3s",
  authDomain: "finance-hw.firebaseapp.com",
  projectId: "finance-hw",
  storageBucket: "finance-hw.appspot.com",
  messagingSenderId: "646623093957",
  appId: "1:646623093957:web:58a7897a44d8b979a57cac",
  measurementId: "G-5PFV2ZK1GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
