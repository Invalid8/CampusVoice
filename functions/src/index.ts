import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

// Get All Users
export const getAllUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.token.role !== "admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be an admin to view all users."
    );
  }

  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return [];
    }

    const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return users;
  } catch (error) {
    throw new functions.https.HttpsError(
      "unknown",
      "Failed to retrieve users.",
      error
    );
  }
});

// Get All Moderators
export const getAllModerators = functions.https.onCall(
  async (data, context) => {
    if (!context.auth || context.auth.token.role !== "admin") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You must be an admin to view moderators."
      );
    }

    try {
      const moderatorsRef = db
        .collection("users")
        .where("role", "==", "moderator");
      const snapshot = await moderatorsRef.get();

      if (snapshot.empty) {
        return [];
      }

      const moderators = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return moderators;
    } catch (error) {
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to retrieve moderators.",
        error
      );
    }
  }
);

// Make User a Moderator
export const makeUserModerator = functions.https.onCall(
  async (data, context) => {
    if (!context.auth || context.auth.token.role !== "admin") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You must be an admin to change user roles."
      );
    }

    const {userId} = data;

    try {
      await db.collection("users").doc(userId).update({role: "moderator"});
      return {message: `User ${userId} is now a moderator.`};
    } catch (error) {
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to update user role.",
        error
      );
    }
  }
);

// Remove Moderator Role
export const removeModeratorRole = functions.https.onCall(
  async (data, context) => {
    if (!context.auth || context.auth.token.role !== "admin") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "You must be an admin to change user roles."
      );
    }

    const {userId} = data;

    try {
      await db.collection("users").doc(userId).update({role: "user"});
      return {message: `User ${userId} is no longer a moderator.`};
    } catch (error) {
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to update user role.",
        error
      );
    }
  }
);

// Get User Data
export const getUserData = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be authenticated to view user data."
    );
  }

  const {userId} = data;

  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new functions.https.HttpsError("not-found", "User not found.");
    }

    return userDoc.data();
  } catch (error) {
    throw new functions.https.HttpsError(
      "unknown",
      "Failed to retrieve user data.",
      error
    );
  }
});
