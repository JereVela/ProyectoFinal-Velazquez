// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyC4mI3l1u2y-b764f1GdXE-diE7IJcFHMU",
  authDomain: "ecommercejere.firebaseapp.com",
  projectId: "ecommercejere",
  storageBucket: "ecommercejere.firebasestorage.app",
  messagingSenderId: "75323514086",
  appId: "1:75323514086:web:be503b1e44ede31430ef27",
  measurementId: "G-R2V11F9VSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
