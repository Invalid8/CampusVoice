/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/lib/firebase";
import { User } from "firebase/auth";

const db = getFirestore(app);

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "Done" | "Closed" | "Canceled" | string;
  createdBy: string;
  upvotes: number;
  downvotes: number;
  isPublic: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  category: string;
  urgency: "low" | "medium" | "high" | string;
  upvotedUsers: string[];
  downvotedUsers: string[];
}

// Create a new suggestion
export const createSuggestion = async (
  suggestion: Omit<Suggestion, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "suggestions"), {
    ...suggestion,
    votedUsers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

// Get a suggestion by ID
export const getSuggestion = async (id: string): Promise<Suggestion> => {
  const docRef = doc(db, "suggestions", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Suggestion;
  } else {
    throw new Error("Suggestion not found");
  }
};

// Update a suggestion (only by owner or moderator)
export const updateSuggestion = async (
  id: string,
  updatedData: Partial<Suggestion>,
  user: User & { role: string }
) => {
  const suggestionRef = doc(db, "suggestions", id);
  const suggestionSnap = await getDoc(suggestionRef);

  if (!suggestionSnap.exists()) {
    throw new Error("Suggestion not found");
  }

  const suggestionData = suggestionSnap.data() as Suggestion;

  if (suggestionData.createdBy !== user.uid && user.role !== "moderator") {
    throw new Error("You do not have permission to update this suggestion");
  }

  await updateDoc(suggestionRef, {
    ...updatedData,
    updatedAt: new Date(),
  });
};

// Delete a suggestion (only by owner or moderator)
export const deleteSuggestion = async (
  id: string,
  user: User & { role: string }
) => {
  const suggestionRef = doc(db, "suggestions", id);
  const suggestionSnap = await getDoc(suggestionRef);

  if (!suggestionSnap.exists()) {
    throw new Error("Suggestion not found");
  }

  const suggestionData = suggestionSnap.data() as Suggestion;

  if (suggestionData.createdBy !== user.uid && user.role !== "moderator") {
    throw new Error("You do not have permission to delete this suggestion");
  }

  await deleteDoc(suggestionRef);
};

// Verify a suggestion (make it public) - only by moderator
export const verifySuggestion = async (
  id: string,
  user: User & { role: string }
) => {
  if (user.role !== "moderator") {
    throw new Error("You do not have permission to verify suggestions");
  }

  const suggestionRef = doc(db, "suggestions", id);
  await updateDoc(suggestionRef, {
    isPublic: true,
    updatedAt: new Date(),
  });
};

// Upvote a suggestion
export const upvoteSuggestion = async (id: string, userId: string) => {
  const suggestionRef = doc(db, "suggestions", id);
  const suggestionSnap = await getDoc(suggestionRef);
  const suggestionData = suggestionSnap.data() as Suggestion;

  if (suggestionData.upvotedUsers.includes(userId)) {
    throw new Error("You have already upvoted this suggestion");
  }

  if (suggestionData.downvotedUsers.includes(userId)) {
    // Remove the user from the downvotedUsers array
    await updateDoc(suggestionRef, {
      downvotes: increment(-1),
      downvotedUsers: suggestionData.downvotedUsers.filter(
        (user) => user !== userId
      ),
    });
  }

  await updateDoc(suggestionRef, {
    upvotes: increment(1),
    upvotedUsers: [...suggestionData.upvotedUsers, userId],
    updatedAt: new Date(),
  });
};

// Downvote a suggestion
export const downvoteSuggestion = async (id: string, userId: string) => {
  const suggestionRef = doc(db, "suggestions", id);
  const suggestionSnap = await getDoc(suggestionRef);
  const suggestionData = suggestionSnap.data() as Suggestion;

  if (suggestionData.downvotedUsers.includes(userId)) {
    throw new Error("You have already downvoted this suggestion");
  }

  if (suggestionData.upvotedUsers.includes(userId)) {
    // Remove the user from the upvotedUsers array
    await updateDoc(suggestionRef, {
      upvotes: increment(-1),
      upvotedUsers: suggestionData.upvotedUsers.filter(
        (user) => user !== userId
      ),
    });
  }

  await updateDoc(suggestionRef, {
    downvotes: increment(1),
    downvotedUsers: [...suggestionData.downvotedUsers, userId],
    updatedAt: new Date(),
  });
};

/**
 * Fetch all suggestions from the Firestore database.
 * @returns {Promise<Suggestion[]>} A promise that resolves to an array of suggestions.
 */
export const getAllSuggestions = async (): Promise<any[]> => {
  try {
    const suggestionsRef = collection(db, "suggestions");
    const suggestionsSnapshot = await getDocs(suggestionsRef);
    const suggestions = suggestionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return suggestions;
  } catch (error) {
    console.error("Error fetching all suggestions:", error);
    throw new Error("Error fetching all suggestions");
  }
};

/**
 * Fetch all public suggestions from the Firestore database.
 * @returns {Promise<any[]>} A promise that resolves to an array of public suggestions.
 */
export const getPublicSuggestions = async (): Promise<any[]> => {
  try {
    const suggestionsRef = collection(db, "suggestions");
    const q = query(suggestionsRef, where("isPublic", "==", true));
    const suggestionsSnapshot = await getDocs(q);
    const suggestions = suggestionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return suggestions;
  } catch (error) {
    console.error("Error fetching public suggestions:", error);
    throw new Error("Error fetching public suggestions");
  }
};

/**
 * Fetch suggestions specific to a user from the Firestore database.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Suggestion[]>} A promise that resolves to an array of user-specific suggestions.
 */
export const getUserSuggestions = async (userId: string): Promise<any[]> => {
  try {
    const suggestionsRef = collection(db, "suggestions");
    const q = query(suggestionsRef, where("userId", "==", userId));
    const suggestionsSnapshot = await getDocs(q);
    const suggestions = suggestionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return suggestions;
  } catch (error) {
    console.error(`Error fetching suggestions for user ${userId}:`, error);
    throw new Error("Error fetching user suggestions");
  }
};
