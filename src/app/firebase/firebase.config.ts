import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5H6mHqpkMg-HJxc62e6PWUi0VmN7aoJk",
  authDomain: "maqola-sayt.firebaseapp.com",
  projectId: "maqola-sayt",
  storageBucket: "maqola-sayt.firebasestorage.app",
  messagingSenderId: "945536781577",
  appId: "1:945536781577:web:367212255f4b7cfa7e57d8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
