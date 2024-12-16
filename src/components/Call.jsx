import Calll from '../assets/call.png'
import styles from '../css/Call.module.css'

const Call = ({handleCallClick, openCall}) => {
    return(
        <div className={styles.Call} onClick={handleCallClick}>
            <img  src={Calll} />
        </div>
    )
}
export default Call;