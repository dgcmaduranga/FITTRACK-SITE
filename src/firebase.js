// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoKEx34Ochq-PyD2ZgIGIpPehRUKWrlEk",
  authDomain: "fittrack-81365.firebaseapp.com",
  projectId: "fittrack-81365",
  storageBucket: "fittrack-81365.firebasestorage.app",
  messagingSenderId: "467680386366",
  appId: "1:467680386366:web:fd69256ba5ff3cf22ca06f"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
