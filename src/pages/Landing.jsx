import styles from "../css/Landing.module.css";
import PropTypes from "prop-types";

import Nav from "../components/Nav";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Landing = ({ handleNavClick, navCount }) => {
  return (
    <div className={styles.Landing}>
      <Nav navCount={navCount} handleNavClick={handleNavClick} />

      {navCount === 1 && (
        <Signup navCount={navCount} handleNavClick={handleNavClick} />
      )}

      {navCount === 2 && (
        <Login navCount={navCount} handleNavClick={handleNavClick} />
      )}
    </div>
  );
};
Landing.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
  navCount: PropTypes.number.isRequired,
};

export default Landing;
