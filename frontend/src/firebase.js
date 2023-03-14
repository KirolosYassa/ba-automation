// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFM5p5mDUEGNBq0dtdyV6dG6mp6TJdIRY",
  authDomain: "ba-automation-5a4ae.firebaseapp.com",
  databaseURL: "https://ba-automation-5a4ae-default-rtdb.firebaseio.com",
  projectId: "ba-automation-5a4ae",
  storageBucket: "ba-automation-5a4ae.appspot.com",
  messagingSenderId: "60846272657",
  appId: "1:60846272657:web:16281e82c4df5b8721cf30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore();

// Initialize Firebase Authentication and get a reference to the service
export { auth, signInWithEmailAndPassword, sendPasswordResetEmail };
// export const auth = getAuth(app);
export default app;
