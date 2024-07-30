import * as admin from "firebase-admin";

const serviceAccount = {
  type: import.meta.env.VITE_type,
  project_id: import.meta.env.VITE_project_id,
  private_key_id: import.meta.env.VITE_private_key_id,
  private_key: import.meta.env.VITE_private_key,
  client_email: import.meta.env.VITE_client_email,
  client_id: import.meta.env.VITE_client_id,
  auth_uri: import.meta.env.VITE_auth_uri,
  token_uri: import.meta.env.VITE_token_uri,
  auth_provider_x509_cert_url: import.meta.env.VITE_auth_provider_x509_cert_url,
  client_x509_cert_url: import.meta.env.VITE_client_x509_cert_url,
  universe_domain: import.meta.env.VITE_universe_domain,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const setCustomUserClaims = async (uid: string, role: string) => {
  await admin.auth().setCustomUserClaims(uid, { role });
  console.log(`Custom claims set for user ${uid}`);
};

export { setCustomUserClaims };
