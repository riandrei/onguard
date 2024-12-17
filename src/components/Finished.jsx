import styles from "../css/Finished.module.css";
import Miko from "../assets/Miko.jpg";

const Finished = ({ data }) => {
  const formattedDate = new Date(data.timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.Finished}>
      <div className={styles.Name}>
        <img src={Miko} />
        <span>Miko Oliva</span>
      </div>
      <span className={styles.Date}>{formattedDate}</span>
    </div>
  );
};
export default Finished;
