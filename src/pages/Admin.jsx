import styles from '../css/Admin.module.css'
import Nav from '../components/Nav';

import Inquiry from '../assets/Inquiry.png'
import Logout from '../assets/logout.png'
import Post from '../assets/Post.png'

const Admin = () => {
    return(
        <div className={styles.Admin}>
            <Nav />

            <div className={styles.Admin_body}>
                <div className={styles.Admin_nav}>
                    <div className={styles.Admin_inner}>
                        <div className={styles.Admin_link}>
                            <img src={Inquiry} />
                            <span>Inquiries</span>
                        </div>

                        <div className={styles.Admin_link}>
                            <img src={Inquiry} />
                            <span>Inquiries</span>
                        </div>

                        <div className={styles.Admin_link}>
                            <img src={Post} />
                            <span>Publish</span>
                        </div>
                    </div>
                    <img className={styles.Out} src={Logout} />
                </div>

                <div className={styles.Admin_content}>

                </div>
            </div>
        </div>
    )
}

export default Admin;