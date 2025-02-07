import { useState } from "react";
import { signUp } from "../lib/firebase"; // Import the signUp function from firebase
import styles from "../css/Signup.module.css";
import PropTypes from "prop-types";

const Signup = ({ handleNavClick }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password === confirmPassword) {
      try {
        await signUp(email, password); // Call the signUp function with email and password
        console.log("User signed up successfully");
        // You can redirect or show success message here
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    } else {
      console.error("Passwords do not match!");
    }
  };

  return (
    <div className={styles.Signup}>
      <h1>Create your account</h1>
      <form className={styles.Forms} onSubmit={handleSubmit}>
        <div className={styles.Fullname}>
          <div className={styles.Fname}>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className={styles.Lname}>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.Email}>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.Fullname}>
          <div className={styles.Fname}>
            <label>Enter your password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.Lname}>
            <label>Confirm password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      <button onClick={() => handleNavClick(0)} className={styles.Close}>
        CLOSE
      </button>
    </div>
  );
};

Signup.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
};

export default Signup;
