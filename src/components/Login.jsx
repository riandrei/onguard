import styles from '../css/Login.module.css'

const Login = ({handleNavClick}) => {
    return(
        <div className={styles.Login}>
            <h1>Log In</h1>
            <div className={styles.Email}>
                <label>Email:</label>
                <input type="text" />
            </div>

            <div className={styles.Password}>
                <label>Password:</label>
                <input type="password" />
            </div>
            <button>SUBMIT</button>
            <button onClick={() => handleNavClick(0)}>CLOSE</button>
        </div>
    )
}

export default Login