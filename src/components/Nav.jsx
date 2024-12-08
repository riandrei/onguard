import { useState } from "react";
import styles from "../css/Nav.module.css";
import PropTypes from "prop-types";

import Logo from "../assets/MainLogo.png";
import Miko from "../assets/Miko.jpg";

const Nav = ({ handleNavClick }) => {
  const [isLogin] = useState(true);

  return (
    <div className={styles.Nav}>
      <div className={styles.Logo}>
        <img src={Logo} />
        <span>On-Guard</span>
      </div>

      {isLogin ? (
        <div className={styles.Details}>
          <button onClick={() => handleNavClick(2)}>Log In</button>
          <button onClick={() => handleNavClick(1)}>Sign Up</button>
        </div>
      ) : (
        <div className={styles.Name}>
          <span>Miko Oliva</span>
          <img src={Miko} />
        </div>
      )}
    </div>
  );
};

Nav.propTypes = {
  navCount: PropTypes.number.isRequired,
  handleNavClick: PropTypes.func.isRequired,
};

export default Nav;
