import styles from '../css/Completed.module.css'
import Finished from './Finished';

const Completed = () => {
    return(
        <div className={styles.Completed}>
            <Finished/>
            <Finished/>
        </div>
    )
}

export default Completed;