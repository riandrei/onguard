import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/firebase";

import BarangayCall from "./BarangayCall";
import Map from "./Map";

import styles from "../css/Emergency.module.css";
import Location from "../assets/Location.webp";
import End from "../assets/end.png";
import Video from "../assets/video.png";
import Video2 from "../assets/videoWhite.png";
import Close from "../assets/close.png";

const BarangayEmergency = ({ userId, callId, handleCallClick }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [showPopup, setShowPopup] = useState(false);

  const handleEndCall = async () => {
    try {
      if (callId) {
        const emergencyRef = doc(firestore, "emergencies", callId);
        await updateDoc(emergencyRef, { status: "completed" });
        console.log(`Emergency ${callId} marked as completed.`);
      }
      handleCallClick();
    } catch (error) {
      console.error("Error updating emergency status:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      const db = getDatabase(
        undefined,
        "https://onguard-60bc2-default-rtdb.asia-southeast1.firebasedatabase.app/"
      );
      const locationRef = ref(db, `locations/${userId}`);
      onValue(locationRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.latitude && data.longitude) {
          setLocation({ latitude: data.latitude, longitude: data.longitude });
        } else {
          setLocation({ latitude: null, longitude: null });
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    if (callId) {
      const emergencyRef = doc(firestore, "emergencies", callId);

      // Listen for changes in the document
      const unsubscribe = onSnapshot(emergencyRef, (snapshot) => {
        const data = snapshot.data();
        if (data && data.status === "completed") {
          console.log("Emergency marked as completed. Ending call...");
          setShowPopup(true); // Show popup when call ends
        }
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [callId]);

  return (
    <div className={styles.Emergency}>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Call Ended</h2>
            <p>The emergency call has been ended.</p>
            <button
              onClick={() => {
                setShowPopup(false);
                handleCallClick();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className={styles.Head}>
        <h1>Emergency Call</h1>
        <img src={Close} onClick={handleCallClick} />
      </div>
      <div className={styles.Emergency_inner}>
        {location.latitude && location.longitude ? (
          <Map location={location} />
        ) : (
          <p>Location Not Found</p>
        )}
        <div className={styles.Location_details}>
          {callId && <BarangayCall callId={callId} />}
          <div className={styles.End}>
            <img src={End} onClick={handleEndCall} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .popup {
          color: black;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        }
        .popup-content button {
          margin-top: 10px;
          padding: 10px 20px;
          background: #ff4d4d;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default BarangayEmergency;
