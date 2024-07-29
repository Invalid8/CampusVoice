"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Cookies from "js-cookie";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    Cookies.set("token", token, { expires: 7, path: "/" });
    console.log("Sign in successful:", user);
  } catch (error: any) {
    console.error("Error signing in with Google:", error?.message);
  }
};

const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    Cookies.remove("token", { path: "/" });
    console.log("Sign out successful");
  } catch (error: any) {
    console.error("Error signing out:", error?.message);
  }
};

const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
};

export { auth, db, signInWithGoogle, logout, getCurrentUser, analytics };
