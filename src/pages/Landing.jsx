import styles from '../css/Landing.module.css'

import Nav from '../components/Nav'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Footer from '../components/Footer'
import Emergency from '../components/Emergency'

const Landing = ({handleNavClick, navCount, openCall, setOpenCall, handleCallClick}) => {
    return(
        <div className={styles.Landing}>
            <Nav navCount={navCount} handleNavClick={handleNavClick} />

            {
                navCount === 1 && <Signup navCount={navCount} handleNavClick={handleNavClick} />
            }

            {
                navCount === 2 && <Login navCount={navCount} handleNavClick={handleNavClick} />
            }

            <div className={styles.Body}>

            </div>
            {
                openCall && <Emergency handleCallClick={handleCallClick} />
            }
        </div>
    )
}

export default Landing;