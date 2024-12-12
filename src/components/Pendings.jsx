import styles from '../css/Pendings.module.css'
import Miko from '../assets/Miko.jpg'

const Pendings = () => {
    return(
        <div className={styles.Pendings}>
            <div className={styles.User}>
                <img src={Miko} />
                <span>Miko Oliva</span>
            </div>

            <div className={styles.Buttons}>
                <button>Accept</button>
                <button>Decline</button>
            </div>
        </div>
    )
}

export default Pendings;