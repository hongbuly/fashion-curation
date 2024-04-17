// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOh7P8ZlbyD4CwAawy-ePn7DmB4IM5XJg",
  authDomain: "nwitter-reloaded-33a69.firebaseapp.com",
  projectId: "nwitter-reloaded-33a69",
  storageBucket: "nwitter-reloaded-33a69.appspot.com",
  messagingSenderId: "513646115922",
  appId: "1:513646115922:web:08b7c88f284cdfdc33b38b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
