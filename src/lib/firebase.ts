import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: "brinto-bbf46.firebaseapp.com",
  projectId: "brinto-bbf46",
  storageBucket: "brinto-bbf46.appspot.com",
  messagingSenderId: "303755799313",
  appId: "1:303755799313:web:649593570d165ae6447ab0",
  measurementId: "G-2EWGHH5T3Z",
};

export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth(): Auth {
  const auth = getAuth(getFirebaseApp());
  auth.useDeviceLanguage();
  return auth;
}
