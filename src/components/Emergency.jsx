import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  serverTimestamp,
  onValue,
} from "firebase/database";
import { doc, collection, setDoc, updateDoc } from "firebase/firestore";
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
      "https://onguard-6f7cb-default-rtdb.asia-southeast1.firebasedatabase.app/"
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

  useEffect(() => {
    const initializeEmergencyDoc = async () => {
      const emergencyDoc = doc(collection(firestore, "emergencies"));

      setEmergencyId(emergencyDoc.id);
      await setDoc(emergencyDoc, {
        userId,
        status: "ongoing",
        timestamp: Date.now(),
      });
      console.log(emergencyDoc.id);
    };

    if (userId) {
      console.log("User ID:", userId);
      initializeEmergencyDoc();
    }
  }, [userId]);

  useEffect(() => {
    setIsCalling(true);
  }, []);

  const handleEndCall = async () => {
    try {
      if (emergencyId) {
        const emergencyRef = doc(firestore, "emergencies", emergencyId);
        await updateDoc(emergencyRef, { status: "completed" });
        console.log(`Emergency ${emergencyId} marked as completed.`);
      }
      handleCallClick();
    } catch (error) {
      console.error("Error updating emergency status:", error);
    }
  };
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
    </div>
  );
};

export default Emergency;
