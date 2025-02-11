import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/Nav.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Logo from "../assets/MainLogo.png";
import DefaultProfile from "../assets/Miko.jpg";

const Nav = ({ isLogin, handleNavClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [userPhoto, setUserPhoto] = useState(DefaultProfile);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const fetchUserData = async (user) => {
      if (!user) {
        setFirstName("");
        setUserPhoto(DefaultProfile);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFirstName(userData.firstName || "Guest");

          setUserPhoto(
            userData.profileImg
              ? `${userData.profileImg}?t=${new Date().getTime()}`
              : DefaultProfile
          );
        } else {
          console.log("User document not found in Firestore.");
          setFirstName("Guest");
          setUserPhoto(DefaultProfile);
        }
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
        setFirstName("Guest");
        setUserPhoto(DefaultProfile);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserData(user);
    });

    return () => unsubscribe();
  }, [location]);

  const isProfilePage = location.pathname === "/profile";

  return (
    <div className={styles.Nav}>
      <div className={styles.Logo}>
        <img src={Logo} alt="On-Guard Logo" />
        <span>On-Guard</span>
      </div>
      {isLogin && !isProfilePage ? (
        <div
          className={styles.Name}
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <span>{firstName || "Guest"}</span>
          <img src={userPhoto} alt="User Profile" />
        </div>
      ) : !isLogin && !isProfilePage ? (
        <div className={styles.Details}>
          <button onClick={() => handleNavClick(2)}>Log In</button>
          <button onClick={() => handleNavClick(1)}>Sign Up</button>
        </div>
      ) : null}{" "}
    </div>
  );
};

Nav.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default Nav;
