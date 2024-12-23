// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyCf_XDOb56ET3ulOT0HDykZ7YAiESj3r1g",
  authDomain: "e-commerce-ef071.firebaseapp.com",
  projectId: "e-commerce-ef071",
  storageBucket: "e-commerce-ef071.firebasestorage.app",
  messagingSenderId: "421768323465",
  appId: "1:421768323465:web:2b5ca1b5b5cb25f47a8158"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
