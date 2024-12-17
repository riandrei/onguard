import styles from "../css/Landing.module.css";
import PropTypes from "prop-types";

import Nav from "../components/Nav";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Footer from "../components/Footer";
import Emergency from "../components/Emergency";
import PostsList from "../components/PostList";

const Landing = ({
  handleNavClick,
  navCount,
  openCall,
  setOpenCall,
  handleCallClick,
}) => {
  return (
    <div className={styles.Landing}>
      {/* Navigation Component */}
      <Nav navCount={navCount} handleNavClick={handleNavClick} />

      {/* Conditional Rendering for Signup */}
      {navCount === 1 && (
        <Signup navCount={navCount} handleNavClick={handleNavClick} />
      )}

      {/* Conditional Rendering for Login */}
      {navCount === 2 && (
        <Login navCount={navCount} handleNavClick={handleNavClick} />
      )}

      {/* Body Section */}
      <div className={styles.Body}>
        <PostsList />
        {openCall && <Emergency handleCallClick={handleCallClick} />}
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

Landing.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
  navCount: PropTypes.number.isRequired,
  openCall: PropTypes.bool.isRequired,
  setOpenCall: PropTypes.func,
  handleCallClick: PropTypes.func.isRequired,
};

export default Landing;
