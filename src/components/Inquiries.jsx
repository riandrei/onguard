import styles from '../css/Inquiries.module.css'

import Pendings from './Pendings'

const Inquiries = () => {
    return(
        <div className={styles.Inquiries}>

            <div className={styles.Header}>
                <div className={styles.Emergency}>
                    <span>Emergency Cases</span>
                    <span>Pending Cases: 4</span>
                </div>
                <div className={styles.Types}>
                    <div className={styles.Specific_type}>
                        <div className={styles.Medical}></div>
                        <span>Medical Emergency</span>
                    </div>

                    <div className={styles.Specific_type}>
                        <div className={styles.Fire}></div>
                        <span>Fire Incident</span>
                    </div>

                    <div className={styles.Specific_type}>
                        <div className={styles.Crime}></div>
                        <span>Crime Report</span>
                    </div>

                    <div className={styles.Specific_type}>
                        <div className={styles.Legal}></div>
                        <span>Legal Assistance</span>
                    </div>
                </div>

                <div className={styles.Sort}>
                    <button className={styles.Selected}>Recent</button>
                    <button>Oldest</button>
                </div>
            </div>
            
            <div className={styles.Pendings}>
                <Pendings />
                <Pendings />
                <Pendings />
                <Pendings />
                <Pendings />
                <Pendings />
                <Pendings />
                <Pendings />
            </div>
        </div>
    )
}

export default Inquiries;