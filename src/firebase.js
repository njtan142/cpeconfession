// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bulletin-bscpe.firebaseapp.com",
  projectId: "bulletin-bscpe",
  storageBucket: "bulletin-bscpe.firebasestorage.app",
  messagingSenderId: "1061036584842",
  appId: "1:1061036584842:web:228779a310e3943fa12273",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
