import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase"; // Import Firebase configuration
import styles from "../css/Completed.module.css";
import Finished from "./Finished";

const Completed = () => {
  const [completedCases, setCompletedCases] = useState([]); // State for completed emergencies

  useEffect(() => {
    const fetchCompletedCases = async () => {
      try {
        // Query Firestore for emergencies with status "completed"
        const emergenciesRef = collection(firestore, "emergencies");
        const q = query(emergenciesRef, where("status", "==", "completed"));
        const querySnapshot = await getDocs(q);

        // Map query results to completed cases
        const fetchedCases = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCompletedCases(fetchedCases); // Set state with fetched cases
      } catch (error) {
        console.error("Error fetching completed emergencies:", error);
      }
    };

    fetchCompletedCases();
  }, []);

  return (
    <div className={styles.Completed}>
      {completedCases.length > 0 ? (
        completedCases.map((caseItem) => (
          <Finished key={caseItem.id} data={caseItem} />
        ))
      ) : (
        <p>No completed emergencies found.</p>
      )}
    </div>
  );
};

export default Completed;
