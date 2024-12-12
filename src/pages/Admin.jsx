import { useState } from 'react';

import styles from '../css/Admin.module.css'
import Nav from '../components/Nav';

import Inquiry from '../assets/Inquiry.png'
import Logout from '../assets/logout.png'
import Post from '../assets/Post.png'
import Logo from '../assets/MainLogo.png'
import Complete from '../assets/Complete.png'

import AdminContent from '../components/AdminContent';
import Inquiries from '../components/Inquiries';
import Publish from '../components/Publish';
import Completed from '../components/Completed';
import Footer from '../components/Footer';

const Admin = () => {

    const [ navCount, setNavCount] = useState(1)
    const handleNavClick = (value) => {
        setNavCount(value)
    }

    return(
        <div className={styles.Admin}>

            <div className={styles.Admin_body}>
                <div className={styles.Admin_nav}>
                    <div className={styles.Admin_inner}>
                        <div className={styles.Logo}>
                            <img src={Logo} />
                            <span>On-Guard</span>
                        </div>

                        <div className={styles.Admin_link} onClick={()=>handleNavClick(1)}>
                            <img src={Inquiry} />
                            <span>Inquiries</span>
                        </div>

                        <div className={styles.Admin_link} onClick={()=>handleNavClick(2)}>
                            <img src={Complete} />
                            <span>Completed</span>
                        </div>

                        <div className={styles.Admin_link} onClick={()=>handleNavClick(3)}>
                            <img src={Post} />
                            <span>Publish</span>
                        </div>
                    </div>
                    <img className={styles.Out} src={Logout} />
                </div>
                {
                    navCount === 1 && <Inquiries/>
                }
                {
                    navCount === 2 && <Completed/>
                }
                {
                    navCount === 3 && <Publish/>
                }

                
            </div>
        </div>
    )
}

export default Admin;