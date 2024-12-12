import styles from '../css/Footer.module.css'
import Logo from '../assets/MainLogo.png'
const Footer = () => {

    return(
        <div className={styles.Footer}>
            <div className={styles.Logo}>
                <img src={Logo} />
                <span>On-Guard</span>
            </div>
            <div className={styles.FootLinks}>
                <span>About | </span>
                <span>Privacy Policy</span>
                <span> | Contact</span>
            </div>
        </div>
    )
}

export default Footer;