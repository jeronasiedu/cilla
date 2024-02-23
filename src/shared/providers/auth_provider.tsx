"use client";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as LogOut,
} from "@firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  Timestamp,
  where,
} from "@firebase/firestore";
import { AuthContext } from "../context/auth_context";
import { db, firebaseAuth } from "@/shared/config/firebase";
import loginWithToken from "@/shared/config/auth/login_with_token";
import { AppUser } from "@/shared/entities/app_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser>();
  const register = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      const { token } = await user.getIdTokenResult();
      await loginWithToken(token);
      await saveUserToDb({
        authType: "email",
        id: user.uid,
        email: email,
        createdAt: Timestamp.now(),
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      const { token } = await user.getIdTokenResult();
      await loginWithToken(token);
      return await userHasOrganisation(user.uid);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const continueWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(firebaseAuth, provider);
      const isNewUser =
        user.metadata.creationTime === user.metadata.lastSignInTime;
      const { token } = await user.getIdTokenResult();
      await loginWithToken(token);
      if (isNewUser) {
        await saveUserToDb({
          authType: "email",
          id: user.uid,
          email: user.email ?? "",
          createdAt: Timestamp.now(),
        });
      }
      return await userHasOrganisation(user.uid);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const signOut = async () => {
    try {
      await LogOut(firebaseAuth);
      await fetch("/api/logout", {
        method: "GET",
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const sendResetEmail = async (email: string) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const deleteAccount = async () => {
    try {
      if (!firebaseAuth.currentUser) return;
      await deleteUser(firebaseAuth.currentUser!);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const saveUserToDb = async (user: AppUser) => {
    try {
      const usersCollection = collection(db, "users");
      const userRef = doc(usersCollection, user.id);
      await setDoc(userRef, user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const userHasOrganisation = async (userId: string) => {
    try {
      const organisationsCollection = collection(db, "organisations-test");
      const q = query(
        organisationsCollection,
        where("userId", "==", userId),
        limit(1),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.length > 0;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        getDoc(userDoc).then((doc) => {
          if (doc.exists()) {
            setUser(doc.data() as AppUser);
          }
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        signOut,
        sendPasswordResetEmail: sendResetEmail,
        deleteAccount,
        continueWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
