import styles from '../css/Finished.module.css'
import Miko from '../assets/Miko.jpg'

const Finished = () => {
    return(
        <div className={styles.Finished}>
            <div className={styles.Name}>
                <img src={Miko} />
                <span>Miko Oliva</span>
            </div>
            <span className={styles.Date}>December 21, 2024 9:047AM</span>
        </div>
    )
}
export default Finished;