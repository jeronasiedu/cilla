import { getApp, getApps, initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyC6ErFdlRiR6MXSvnUUxO7WFptAL9C1Lp4",
  authDomain: "proceipt-9b5bb.firebaseapp.com",
  projectId: "proceipt-9b5bb",
  storageBucket: "proceipt-9b5bb.appspot.com",
  messagingSenderId: "236766359073",
  appId: "1:236766359073:web:3ded572235a8962ef4fd60",
  measurementId: "G-VSNYSZV248",
};

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
};

export const firebaseAuth = getAuth(getFirebaseApp());
export const db = getFirestore(getFirebaseApp());
export const storage = getStorage(getFirebaseApp());
