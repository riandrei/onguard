import styles from '../css/Admin.module.css'

import Miko from '../assets/Miko.jpg'
import Location from '../assets/Location.png'


const AdminContent = () => {
    return(
        <div className={styles.Admin_content}>
                    <div className={styles.Admin_right}>
                        <div className={styles.Name_container}>
                            <img src={Miko} />
                            <div className={styles.User_name}>
                                <span>Miko Oliva</span>
                                <span>09123456789</span>
                            </div>
                        </div>

                        <div className={styles.Date}>
                            <span>December 19, 2024 12:04PM(9hrs ago)</span>
                            <span>mikooliva@gmail.com</span>
                        </div>
                    </div>

                    <div className={styles.Location}>
                        <span>Dalawang truck nagbanggan 2 sugatan</span>
                        <img src={Location} />
                    </div>
                </div>
    )
}

export default AdminContent;