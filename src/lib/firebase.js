import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, // Import signOut for logging out
} from "firebase/auth";

// Your Firebase configuration object (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyCqrn-e2_GrCFtOcKmqpS0lcHz8q1hywPk",
  authDomain: "onguard-2efb2.firebaseapp.com",
  projectId: "onguard-2efb2",
  storageBucket: "onguard-2efb2.firebasestorage.app",
  messagingSenderId: "920417692001",
  appId: "1:920417692001:web:6940353bdc60a5d2d1bd20",
  measurementId: "G-G06WXCDFDX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
export { auth, signUp, signIn, logOut };
