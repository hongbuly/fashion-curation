// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa0x654Upuf0JzDv2-dpq26yFdxWpPFQU",
  authDomain: "fashion-curation.firebaseapp.com",
  projectId: "fashion-curation",
  storageBucket: "fashion-curation.appspot.com",
  messagingSenderId: "780923678656",
  appId: "1:780923678656:web:d73355b9e0668f041b2225",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
