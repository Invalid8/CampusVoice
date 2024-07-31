/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  increment,
} from "firebase/firestore";
import { app } from "@/lib/firebase";
import { User } from "firebase/auth";

const db = getFirestore(app);

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "Done" | "CLosed" | "Canceled" | string;
  createdBy: string;
  upvotes: number;
  downvotes: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  urgency: "low" | "medium" | "high" | string;
}

// Create a new suggestion
export const createSuggestion = async (
  suggestion: Omit<Suggestion, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "suggestions"), {
    ...suggestion,
    status: "Draft",
    upvotes: 0,
    downvotes: 0,
    isPublic: false,
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

// Change the status of a suggestion (only by moderator)
export const changeSuggestionStatus = async (
  id: string,
  status: string,
  user: User & { role: string }
) => {
  if (user.role !== "moderator") {
    throw new Error(
      "You do not have permission to change the status of suggestions"
    );
  }

  const suggestionRef = doc(db, "suggestions", id);
  await updateDoc(suggestionRef, {
    status: status,
    updatedAt: new Date(),
  });
};

// Upvote a suggestion
export const upvoteSuggestion = async (id: string) => {
  const suggestionRef = doc(db, "suggestions", id);
  await updateDoc(suggestionRef, {
    upvotes: increment(1),
  });
};

// Downvote a suggestion
export const downvoteSuggestion = async (id: string) => {
  const suggestionRef = doc(db, "suggestions", id);
  await updateDoc(suggestionRef, {
    downvotes: increment(1),
  });
};

// Get all public suggestions
export const getPublicSuggestions = async (): Promise<Suggestion[]> => {
  const q = query(collection(db, "suggestions"), where("isPublic", "==", true));
  const querySnapshot = await getDocs(q);
  const suggestions: Suggestion[] = [];
  querySnapshot.forEach((doc) => {
    suggestions.push({ id: doc.id, ...doc.data() } as Suggestion);
  });
  return suggestions;
};

// Get all suggestions by user
export const getUserSuggestions = async (
  userId: string
): Promise<Suggestion[]> => {
  const q = query(
    collection(db, "suggestions"),
    where("createdBy", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  const suggestions: Suggestion[] = [];
  querySnapshot.forEach((doc) => {
    suggestions.push({ id: doc.id, ...doc.data() } as Suggestion);
  });
  return suggestions;
};
