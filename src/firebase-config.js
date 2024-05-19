// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWDuFPkhGmYY13Ubh5ZwMe3YFAkwQ3yXs",
  authDomain: "awt-labs.firebaseapp.com",
  projectId: "awt-labs",
  storageBucket: "awt-labs.appspot.com",
  messagingSenderId: "639183436933",
  appId: "1:639183436933:web:62f73e21f664234e0f7dec",
  measurementId: "G-VK09W66RW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore(app);