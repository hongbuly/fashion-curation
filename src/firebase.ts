// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCwBF8ZHrNJ3EUTlFLngvUjTJwrzWA9vg",
  authDomain: "fashion-curation-b4e2e.firebaseapp.com",
  projectId: "fashion-curation-b4e2e",
  storageBucket: "fashion-curation-b4e2e.appspot.com",
  messagingSenderId: "255244884400",
  appId: "1:255244884400:web:27f2816dfdf48dea791e75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
