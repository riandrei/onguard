import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, // Import signOut for logging out
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyALVsuSWiP_fwDbscLQ3zaE5RQmjjBXUMo",

  authDomain: "onguard-6f7cb.firebaseapp.com",

  databaseURL:
    "https://onguard-6f7cb-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "onguard-6f7cb",

  storageBucket: "onguard-6f7cb.firebasestorage.app",

  messagingSenderId: "245232388429",

  appId: "1:245232388429:web:93721d2372bf679b574f04",

  measurementId: "G-GXZTMXXWKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Initialize Messaging
const messaging = getMessaging(app);

// Get Auth instance
const auth = getAuth(app);

// Sign-up function
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Sign-in function
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error; // Optional: rethrow the error to handle it in the Login component
  }
};

// Sign-out function
const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

// Export auth, signUp, signIn, and logOut functions
export { auth, signUp, signIn, logOut, firestore, storage, messaging };
