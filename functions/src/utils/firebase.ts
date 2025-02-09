import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";

const app = getApps().length
    ? getApp()
    : initializeApp({ projectId: "habits-together" });

export const db = getFirestore(app);
export const auth = getAuth(app);