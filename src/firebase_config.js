// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDAO65sHouPIoewwnS0LvnA2irSfm6gfzM",
//   authDomain: "emergency-system-9d041.firebaseapp.com",
//   projectId: "emergency-system-9d041",
//   storageBucket: "emergency-system-9d041.appspot.com",
//   messagingSenderId: "792537773846",
//   appId: "1:792537773846:web:8d2d08151dfd506fa80237",
//   measurementId: "G-C5ZM58R318"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Conditionally initialize Analytics
// let analytics;
// isSupported().then((supported) => {
//   if (supported) {
//     analytics = getAnalytics(app);
//   }
// }).catch((error) => {
//   console.error("Analytics initialization error:", error);
// });

// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);

// // Upload Profile Picture Function
// export const uploadProfilePicture = async (name, file) => {
//   const storageRef = ref(storage, `profilePictures/${name}`);
//   await uploadBytes(storageRef, file);
//   const url = await getDownloadURL(storageRef);
//   return url;
// };

// // Export the required components
// export { auth, db, storage, analytics };
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAO65sHouPIoewwnS0LvnA2irSfm6gfzM",
  authDomain: "emergency-system-9d041.firebaseapp.com",
  projectId: "emergency-system-9d041",
  storageBucket: "emergency-system-9d041.appspot.com",
  messagingSenderId: "792537773846",
  appId: "1:792537773846:web:8d2d08151dfd506fa80237",
  measurementId: "G-C5ZM58R318",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Upload a profile picture to Firebase Storage.
 * @param {string} dpDataUrl - The profile picture as a base64-encoded data URL.
 * @returns {Promise<string>} - A promise resolving to the download URL of the uploaded profile picture.
 */
export const uploadDP = async (dpDataUrl) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const userId = user.uid; // Get the user's unique ID
  const dpRef = ref(storage, `profile_pictures/${userId}`);

  try {
    // Upload the profile picture
    await uploadString(dpRef, dpDataUrl, "data_url");

    // Get the download URL for the uploaded picture
    const dpUrl = await getDownloadURL(dpRef);

    console.log("Profile picture uploaded successfully:", dpUrl);
    return dpUrl;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
