// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEktn41FML3ttJyzpuH8-Ar8WPLEXvRbA",
  authDomain: "learnify-f9748.firebaseapp.com",
  projectId: "learnify-f9748",
  storageBucket: "learnify-f9748.firebasestorage.app",
  messagingSenderId: "897730639037",
  appId: "1:897730639037:web:ba122ce247b0325bf0f3d4",
  measurementId: "G-86ZMH9FPLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };