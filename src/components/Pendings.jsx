import { doc, updateDoc } from "firebase/firestore";
import { firestore, getUserInfo } from "../lib/firebase";

import styles from "../css/Pendings.module.css";
import User from "../assets/user.png";
import { useEffect, useState } from "react";
import { set } from "firebase/database";

const Pendings = ({ handleViewClick, data }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const handleEndCall = async (emergencyId) => {
    try {
      if (emergencyId) {
        const emergencyRef = doc(firestore, "emergencies", emergencyId);
        await updateDoc(emergencyRef, { status: "completed" });
        console.log(`Emergency ${emergencyId} marked as completed.`);
      }
    } catch (error) {
      console.error("Error updating emergency status:", error);
    }
  };

  useEffect(() => {
    getUserInfo(data.userId).then((user) => {
      setProfileImg(user.profileImg);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    });
  }, []);

  return (
    <div className={styles.Pendings}>
      <div className={styles.User}>
        <img src={profileImg || User} />
        <span>{`${firstName} ${lastName}`}</span>
      </div>

      <div className={styles.Buttons}>
        <button onClick={() => handleViewClick(data.id, data.userId)}>
          Accept
        </button>
        <button onClick={() => handleEndCall(data.id)}>Decline</button>
      </div>
    </div>
  );
};

export default Pendings;
