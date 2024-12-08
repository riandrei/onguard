import styles from '../css/Landing.module.css'

import Nav from '../components/Nav'
import Signup from '../components/Signup'

const Landing = () => {
    return(
        <div className={styles.Landing}>
            <Nav />

            <Signup />
        </div>
    )
}

export default Landing;