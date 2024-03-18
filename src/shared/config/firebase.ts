import { getApp, getApps, initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyA6LVNRd-r71iBaLFe0bwJs_IKV2MAKcAM",
  authDomain: "farm-choice.firebaseapp.com",
  projectId: "farm-choice",
  storageBucket: "farm-choice.appspot.com",
  messagingSenderId: "662073078216",
  appId: "1:662073078216:web:a002b79390d4b85a43d0fd",
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
