// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAO65sHouPIoewwnS0LvnA2irSfm6gfzM",
  authDomain: "emergency-system-9d041.firebaseapp.com",
  projectId: "emergency-system-9d041",
  storageBucket: "emergency-system-9d041.appspot.com",
  messagingSenderId: "792537773846",
  appId: "1:792537773846:web:8d2d08151dfd506fa80237",
  measurementId: "G-C5ZM58R318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conditionally initialize Analytics
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch((error) => {
  console.error("Analytics initialization error:", error);
});

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Upload Profile Picture Function
export const uploadProfilePicture = async (name, file) => {
  const storageRef = ref(storage, `profilePictures/${name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

// Export the required components
export { auth, db, storage, analytics };
