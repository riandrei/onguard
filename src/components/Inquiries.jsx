import { useState } from 'react'
import styles from '../css/Inquiries.module.css'

import Pendings from './Pendings'

const Inquiries = () => {
    const [selectedButton, setSelectedButton] = useState('Recent');

    const handleClick = (buttonName) => {
      setSelectedButton(buttonName);
    };
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
                    <button
                        className={selectedButton === 'Recent' ? styles.Selected : ''}
                        onClick={() => handleClick('Recent')}
                    >
                        Recent
                    </button>
                    <button
                        className={selectedButton === 'Oldest' ? styles.Selected : ''}
                        onClick={() => handleClick('Oldest')}
                    >
                        Oldest
                    </button>
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