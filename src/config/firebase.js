import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCED23-04Ja9lIX0rSJvYGcBfh0RgVGiic",
  authDomain: "discord-clone-bd531.firebaseapp.com",
  projectId: "discord-clone-bd531",
  storageBucket: "discord-clone-bd531.appspot.com",
  messagingSenderId: "13960206431",
  appId: "1:13960206431:web:b89f532186aebebf7123ea",
  measurementId: "G-RE8856E171",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
