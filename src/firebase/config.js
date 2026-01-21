import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "******************************",
  authDomain: "movieapp-d1725.firebaseapp.com",
  projectId: "movieapp-d1725",
  storageBucket: "movieapp-d1725.appspot.com",
  messagingSenderId: "114324618198",
  appId: "1:114324618198:web:b1eb6a2a0011262d174277"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT AUTH (CRUCIAL)
export const auth = getAuth(app);
