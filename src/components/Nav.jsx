
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../css/Nav.module.css'

import Logo from '../assets/MainLogo.png'
import Miko from '../assets/Miko.jpg'

const Nav = ({navCount, handleNavClick}) => {

    const [isLogin, setIsLogin] = useState(true)

    return(
        <div className={styles.Nav}>
            <div className={styles.Logo}>
                <img src={Logo} />
                <span>On-Guard</span>
            </div>

            {
                isLogin ? (
                    <div className={styles.Details}>
                        <button>Log In</button>
                        <button onClick={() => handleNavClick(1)}>Sign Up</button>
                    </div>
                ): (
                    <div className={styles.Name}>
                        <span>Miko Oliva</span>
                        <img src={Miko}/>
                    </div>
                )
            }
        </div>
    )
}

export default Nav;