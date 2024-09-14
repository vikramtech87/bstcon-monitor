import * as admin from "firebase-admin";
import { App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

let app: App | null = null;

if (admin.apps.length > 0) {
  app = admin.apps[0];
} else {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore(app!);

export { db };
