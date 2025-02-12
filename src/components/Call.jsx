import { useState, useEffect } from "react";
import Calll from "../assets/call.png";
import styles from "../css/Call.module.css";

const Call = ({ handleCallClick, openCall }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const currentRoute = window.location.pathname;

  useEffect(() => {
    // Check if user is logged in (Example: stored user info in localStorage)
    const user = localStorage.getItem("user"); // Modify based on your auth method
    setIsLoggedIn(!!user);
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      console.log("not logged");
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
