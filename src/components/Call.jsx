import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import Calll from "../assets/call.png";
import styles from "../css/Call.module.css";

const Call = ({ handleCallClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const currentRoute = window.location.pathname;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowPopup(true); // Show popup if not logged in
    } else {
      handleCallClick();
    }
  };

  if (currentRoute === "/admin") {
    return null;
  }

  return (
    <>
      <div className={styles.Call} onClick={handleClick}>
        <img src={Calll} alt="Call" />
      </div>

      {/* Popup Notice */}
      {showPopup && (
        <div className={styles.Popup}>
          <div className={styles.PopupContent}>
            <p>You need to log in to use this feature.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Call;
