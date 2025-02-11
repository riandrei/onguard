import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../lib/firebase";
import styles from "../css/Profile.module.css";
import Nav from "../components/Nav";

const CLOUD_NAME = "dhjoeri8d";
const UPLOAD_PRESET = "profile";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImg: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.error("No user data found!");
        }
      } else {
        console.error("User not authenticated");
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Only image files are allowed!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      console.error("File is too large! Max size is 2MB.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        const newProfileImg = response.data.secure_url;
        console.log("File uploaded successfully:", newProfileImg);

        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, { profileImg: newProfileImg });

        setUserData((prevData) => ({
          ...prevData,
          profileImg: newProfileImg,
        }));
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      console.log("Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className={styles.Profile}>
      <Nav />
      <div className={styles.Profile_body}>
        <div className={styles.Profile_left}>
          <img
            src={userData.profileImg || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <label htmlFor="dp">Upload Profile Picture</label>
          <input
            id="dp"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={!isEditable}
          />
          <button onClick={handleLogout}>Log Out</button>{" "}
        </div>

        <div className={styles.Profile_right}>
          <div className={styles.Password}>
            <span>Personal Details:</span>
            <div className={styles.Password_inner}>
              <div className={styles.Password_inner2}>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className={styles.Password_inner2}>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>

            <div className={styles.Password_inner3}>
              <label>Email Address:</label>
              <input type="text" value={userData.email} disabled />
            </div>
          </div>

          <div className={styles.Save}>
            <button onClick={handleSave} disabled={!isEditable}>
              SAVE
            </button>
            <button onClick={() => setIsEditable(!isEditable)}>
              {isEditable ? "LOCK" : "EDIT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
