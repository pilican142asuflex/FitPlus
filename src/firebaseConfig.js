// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "fitplus-edc14.firebaseapp.com",
    projectId: PROJECT_ID,
    storageBucket: "fitplus-edc14.appspot.com",
    messagingSenderId: MSG_ID,
    appId: APP_ID,
    measurementId: MES_ID
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db ,auth};
