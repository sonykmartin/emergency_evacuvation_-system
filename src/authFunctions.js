// // src/authFunctions.js
// import { auth } from './firebase_config'; // Ensure this path is correct
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// // import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";


// // Initialize Firebase storage and Firestore
// const storage = getStorage();
// const db = getFirestore();

// // Function to log in a user
// export const login = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     throw new Error(error.message); // Propagate error
//   }
// };

// // Function to sign up a new user
// export const signup = async (email, password) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     throw new Error(error.message); // Propagate error
//   }
// };

// // Function to log out the user
// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     throw new Error(error.message); // Propagate error
//   }
// };

// // // Function to upload profile picture
// // export const uploadDP = async (name, uri) => {
// //   const response = await fetch(uri);
// //   const blob = await response.blob();
// //   const storageRef = ref(storage, `profile_pictures/${name}`);
// //   await uploadBytes(storageRef, blob);
// //   const downloadURL = await getDownloadURL(storageRef);
// //   return downloadURL; // Return the URL of the uploaded image
// // };


// export const uploadDP = async (userId, dpDataUrl) => {
//   try {
//     const storage = getStorage();
//     const dpRef = ref(storage, `profile_pictures/${userId}`);
//     await uploadString(dpRef, dpDataUrl, "data_url");
//     const dpUrl = await getDownloadURL(dpRef);
//     return dpUrl;
//   } catch (error) {
//     console.error("Error uploading profile picture:", error);
//     throw error;
//   }
// };
// src/authFunctions.js
import { auth } from './firebase_config'; // Ensure this path is correct
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

// Initialize Firebase storage and Firestore
const storage = getStorage();
const db = getFirestore();

// Function to log in a user
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message); // Propagate error
  }
};

// Function to sign up a new user
export const signup = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message); // Propagate error
  }
};

// Function to log out the user
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message); // Propagate error
  }
};

// Function to upload profile picture
export const uploadDP = async (userId, dpDataUrl) => {
  try {
    const dpRef = ref(storage, `profile_pictures/${userId}`);
    await uploadString(dpRef, dpDataUrl, "data_url");
    const dpUrl = await getDownloadURL(dpRef);
    return dpUrl;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
