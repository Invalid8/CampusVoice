import * as admin from "firebase-admin";
import * as serviceAccount from "./service.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const setCustomUserClaims = async (uid: string, role: string) => {
  await admin.auth().setCustomUserClaims(uid, { role });
  console.log(`Custom claims set for user ${uid}`);
};

export { setCustomUserClaims };
