import styles from "../css/Landing.module.css";
import PropTypes from "prop-types";

<<<<<<< HEAD
import Nav from '../components/Nav'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Footer from '../components/Footer'
import Emergency from '../components/Emergency'

const Landing = ({handleNavClick, navCount, openCall, setOpenCall, handleCallClick}) => {
    return(
        <div className={styles.Landing}>
            <Nav navCount={navCount} handleNavClick={handleNavClick} />
=======
import Nav from "../components/Nav";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Landing = ({ handleNavClick, navCount }) => {
  return (
    <div className={styles.Landing}>
      <Nav navCount={navCount} handleNavClick={handleNavClick} />
>>>>>>> a01d15ab07383ce4bc225f5acecb48e910dfad56

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

<<<<<<< HEAD
            <div className={styles.Body}>

            </div>
            {
                openCall && <Emergency handleCallClick={handleCallClick} />
            }
        </div>
    )
}

export default Landing;
=======
export default Landing;
>>>>>>> a01d15ab07383ce4bc225f5acecb48e910dfad56
