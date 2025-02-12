import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../lib/firebase"; // Import the signIn function from firebase
import styles from "../css/Login.module.css";
import PropTypes from "prop-types";

const Login = ({ handleNavClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn(email, password); // Call the signIn function with email and password
      console.log("User logged in successfully");
      console.log(response);

      if (response.role === "admin") {
        navigate("/admin");
      } else {
        setShowPopup(true); // Show success popup for users
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className={styles.Login}>
      <h1>Log In</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <div className={styles.Email}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Bind email input
          />
        </div>

        <div className={styles.Password}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Bind password input
          />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      <button onClick={() => handleNavClick(0)}>CLOSE</button>

      {/* Success Popup */}
      {showPopup && (
        <div className={styles.Popup}>
          <div className={styles.PopupContent}>
            <p>Login successful!</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

Login.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
};

export default Login;
