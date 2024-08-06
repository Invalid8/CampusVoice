/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();

/**
 * Get all users from the Firestore database.
 * @returns {Promise<any[]>} - A promise that resolves to an array of user objects.
 */
export async function getAllUsers(): Promise<any[]> {
  try {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return usersList;
  } catch (error: any) {
    throw new Error(`Failed to retrieve users: ${error.message}`);
  }
}

/**
 * Get all moderators from the Firestore database.
 * @returns {Promise<any[]>} - A promise that resolves to an array of moderator objects.
 */
export async function getAllModerators(): Promise<any[]> {
  try {
    const moderatorsRef = collection(db, "users");
    const q = query(moderatorsRef, where("role", "==", "moderator"));
    const moderatorsSnapshot = await getDocs(q);
    const moderatorsList = moderatorsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return moderatorsList;
  } catch (error: any) {
    throw new Error(`Failed to retrieve moderators: ${error.message}`);
  }
}

/**
 * Make a user a moderator in the Firestore database.
 * @param {string} userId - The ID of the user to make a moderator.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
 */
export async function makeUserModerator(userId: string): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: "moderator" });
  } catch (error: any) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }
}

/**
 * Remove the moderator role from a user in the Firestore database.
 * @param {string} userId - The ID of the user to remove the moderator role from.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
 */
export async function removeModeratorRole(userId: string): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: "user" }); // or another default role
  } catch (error: any) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }
}

/**
 * Get user data from the Firestore database.
 * @param {string} userId - The ID of the user to retrieve data for.
 * @returns {Promise<any>} - A promise that resolves to the user data.
 */
export async function getUserData(userId: string): Promise<any> {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error: any) {
    throw new Error(`Failed to retrieve user data: ${error.message}`);
  }
}
