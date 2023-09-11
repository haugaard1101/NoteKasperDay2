// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUHpxCdVE8BMstNdrjbzqwxiHFZhM0qwU",
  authDomain: "project-34e57.firebaseapp.com",
  projectId: "project-34e57",
  storageBucket: "project-34e57.appspot.com",
  messagingSenderId: "694348609044",
  appId: "1:694348609044:web:203f3ae1a5bde8eb365901"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export{ app, database }