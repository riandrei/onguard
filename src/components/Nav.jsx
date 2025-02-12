import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/Nav.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Logo from "../assets/MainLogo.png";
import DefaultProfile from "../assets/user.png";

const Nav = ({ isLogin, handleNavClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [userPhoto, setUserPhoto] = useState(DefaultProfile);
  const [user, setUser] = useState(null);

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
      setUser(user); // Store user state
      fetchUserData(user);
    });

    return () => unsubscribe();
  }, [location]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isProfilePage = location.pathname === "/profile";

  return (
    <div className={styles.Nav}>
      <div className={styles.Logo}>
        <img src={Logo} alt="On-Guard Logo" />
        <span>On-Guard</span>
      </div>

      {user ? ( // If user is logged in, show profile and logout button
        <div className={styles.Details}>
          {!isProfilePage && (
            <div
              className={styles.Name}
              onClick={() => navigate("/profile")}
              style={{ cursor: "pointer" }}
            >
              <span>{firstName || "Guest"}</span>
              <img src={userPhoto} alt="User Profile" />
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : !isProfilePage ? ( // If no user, show login/signup buttons
        <div className={styles.Details}>
          <button onClick={() => handleNavClick(2)}>Log In</button>
          <button onClick={() => handleNavClick(1)}>Sign Up</button>
        </div>
      ) : null}
    </div>
  );
};

Nav.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default Nav;
