// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is 

import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA7tqW2y1j38cYxO-z5RgG6gZQZ_Hr8cgg",
  authDomain: "food-app-1062c.firebaseapp.com",
  projectId: "food-app-1062c",
  storageBucket: "food-app-1062c.appspot.com",
  messagingSenderId: "152823914000",
  appId: "1:152823914000:web:99bc56e006db379ba83495",
  measurementId: "G-YTRR724X2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db};