// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq2TIsv51A1pp3zxNIUZKptQvVAIUirmg",
  authDomain: "movieapp-d1725.firebaseapp.com",
  projectId: "movieapp-d1725",
  storageBucket: "movieapp-d1725.firebasestorage.app",
  messagingSenderId: "114324618198",
  appId: "1:114324618198:web:b1eb6a2a0011262d174277"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);