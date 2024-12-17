import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";

import styles from "../css/Pendings.module.css";
import Miko from "../assets/Miko.jpg";

const Pendings = ({ handleViewClick, data }) => {
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
  return (
    <div className={styles.Pendings}>
      <div className={styles.User}>
        <img src={Miko} />
        <span>Miko Oliva</span>
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
