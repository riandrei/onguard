import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useEffect, useState } from "react";
import { set } from "firebase/database";
import BarangayCall from "./BarangayCall";

const Barangay = ({ userId, barangayId }) => {
  const [emergencies, setEmergencies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentCallId, setCurrentCallId] = useState(null);

  const handleViewClick = (callId) => {
    console.log(callId);
    setShowPopup(true);
    setCurrentCallId(callId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "emergencies"));
      const emergenciesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmergencies(emergenciesList);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    };
    fetchData();
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      {console.log(emergencies)}
      {emergencies.map((emergency) => (
        <div key={emergency.id}>
          <h2>{emergency.userId}</h2>
          <p>{emergency.status}</p>
          <p>{emergency.id}</p>
          <button onClick={() => handleViewClick(emergency.id)}>View</button>
        </div>
      ))}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <BarangayCall callId={currentCallId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Barangay;
