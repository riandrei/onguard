import styles from '../css/Signup.module.css'

const Signup = ({navCount, handleNavClick}) => {
    return(
        <div className={styles.Signup}>
            <h1>Create your account</h1>
            <div className={styles.Fullname}>
                <div className={styles.Fname}>
                    <label>First Name:</label>
                    <input type="text" />
                </div>

                <div className={styles.Lname}>
                    <label>Last Name:</label>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.Email}>
                <label> Email Address:</label>
                <input type="text" />
            </div>

            <div className={styles.Fullname}>
                <div className={styles.Fname}>
                    <label>Enter your password:</label>
                    <input type="password" />
                </div>

                <div className={styles.Lname}>
                    <label>Confirm password:</label>
                    <input type="password" />
                </div>
            </div>
            <button>SUBMIT</button>
            <button onClick={() => handleNavClick(0)} className={styles.Close}>CLOSE</button>

        </div>
    )
}

export default Signup;