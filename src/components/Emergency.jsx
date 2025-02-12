import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  serverTimestamp,
  onValue,
} from "firebase/database";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../lib/firebase";

import Map from "../components/Map";
import ResidentCall from "../components/ResidentCall";

import styles from "../css/Emergency.module.css";
import Location from "../assets/Location.webp";
import End from "../assets/end.png";
import Video from "../assets/video.png";
import Video2 from "../assets/videoWhite.png";
import Close from "../assets/close.png";

const Emergency = ({ handleCallClick }) => {
  const [video, setVideo] = useState(false);
  const handleVideoClick = () => {
    setVideo(!video);
    console.log(video);
  };

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [emergencyId, setEmergencyId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setIsTracking(true);

    // Watch the user's position
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);

        // Update Firebase Realtime Database
        updateLocationInDatabase(latitude, longitude);
      },
      (err) => {
        setError(err.message);
      }
    );

    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }

    setIsTracking(false);
    setLocation({ latitude: null, longitude: null });

    // Optional: Clear the location in the database
    updateLocationInDatabase(null, null);
  };

  const updateLocationInDatabase = (latitude, longitude) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("User is not authenticated.");
      return;
    }

    const db = getDatabase(
      undefined,
      "https://onguard-60bc2-default-rtdb.asia-southeast1.firebasedatabase.app/"
    );
    const locationRef = ref(db, `locations/${user.uid}`);

    set(locationRef, {
      latitude: latitude,
      longitude: longitude,
      timestamp: serverTimestamp(),
    })
      .then(() => console.log("Location updated in Firebase."))
      .catch((err) =>
        console.error("Error updating location in Firebase:", err)
      );
  };

  useEffect(() => {
    setIsTracking(true);
  }, []); // Trigger only once

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  });

  useEffect(() => {
    if (isTracking) {
      startTracking();
    } else if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);

  const [isCalling, setIsCalling] = useState(false);

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
    const initializeEmergencyDoc = async () => {
      if (!userId) return;

      const emergenciesRef = collection(firestore, "emergencies");
      const q = query(
        emergenciesRef,
        where("userId", "==", userId),
        where("status", "==", "ongoing")
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // An ongoing emergency already exists, use its ID
        const existingEmergency = querySnapshot.docs[0];
        setEmergencyId(existingEmergency.id);
        console.log("Existing emergency:", existingEmergency.id);
      } else {
        // No ongoing emergency, create a new one
        const emergencyDoc = doc(emergenciesRef);
        setEmergencyId(emergencyDoc.id);
        await setDoc(emergencyDoc, {
          userId,
          status: "ongoing",
          timestamp: Date.now(),
        });
        console.log("New emergency created:", emergencyDoc.id);
      }
    };

    initializeEmergencyDoc();
  }, [userId]);

  useEffect(() => {
    setIsCalling(true);
  }, []);

  useEffect(() => {
    if (emergencyId) {
      const emergencyRef = doc(firestore, "emergencies", emergencyId);

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
  }, [emergencyId]);

  const handleEndCall = async () => {
    try {
      if (emergencyId) {
        const emergencyRef = doc(firestore, "emergencies", emergencyId);
        await updateDoc(emergencyRef, { status: "completed" });
        console.log(`Emergency ${emergencyId} marked as completed.`);
      }

      handleCallClick(); // Assuming this updates UI state
    } catch (error) {
      console.error("Error updating emergency status:", error);
    }
  };
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
          {isCalling && emergencyId ? (
            <ResidentCall callId={emergencyId} />
          ) : (
            <button>Start Call</button>
          )}
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

export default Emergency;
