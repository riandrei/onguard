import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { doc, updateDoc } from "firebase/firestore";
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
        "https://onguard-6f7cb-default-rtdb.asia-southeast1.firebasedatabase.app/"
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

  return (
    <div className={styles.Emergency}>
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
    </div>
  );
};

export default BarangayEmergency;
