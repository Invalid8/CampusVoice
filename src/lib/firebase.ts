/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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

const createUserDocument = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "user", // Default role
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } else {
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  }
};

const signInWithGoogle = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await createUserDocument(user);
    const token = await user.getIdToken();
    Cookies.set("token", token, { expires: 7, path: "/" });
  } catch (error: any) {
    console.error("Error signing in with Google:", error?.message);
  }
};

const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    Cookies.remove("token", { path: "/" });
  } catch (error: any) {
    console.error("Error signing out:", error?.message);
  }
};

const getCurrentUser = (): Promise<any> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          resolve({ ...user, ...userData });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

export { auth, db, signInWithGoogle, logout, getCurrentUser, analytics, app };
