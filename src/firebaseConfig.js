// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8xaXSPUhLr8D8i_6V3epYPUhsj8bVz0c",
    authDomain: "fitplus-edc14.firebaseapp.com",
    projectId: "fitplus-edc14",
    storageBucket: "fitplus-edc14.appspot.com",
    messagingSenderId: "556369234732",
    appId: "1:556369234732:web:2a07b981bbeacec3227a89",
    measurementId: "G-W43533L41D"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db ,auth};
