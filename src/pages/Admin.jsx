import { useState } from "react";
import { logOut } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

import styles from "../css/Admin.module.css";

import Inquiry from "../assets/Inquiry.png";
import Logout from "../assets/logout.png";
import Post from "../assets/Post.png";
import Logo from "../assets/MainLogo.png";
import Complete from "../assets/Complete.png";

import Inquiries from "../components/Inquiries";
import Publish from "../components/Publish";
import Completed from "../components/Completed";

const Admin = () => {
  const [navCount, setNavCount] = useState(1);
  const navigate = useNavigate();

  const handleNavClick = (value) => {
    setNavCount(value);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className={styles.Admin}>
      <div className={styles.Admin_body}>
        <div className={styles.Admin_nav}>
          <div className={styles.Admin_inner}>
            <div className={styles.Logo}>
              <img src={Logo} alt="Logo" />
              <span>On-Guard</span>
            </div>

            <div
              className={styles.Admin_link}
              onClick={() => handleNavClick(1)}
            >
              <img src={Inquiry} alt="Inquiries" />
              <span>Inquiries</span>
            </div>

            <div
              className={styles.Admin_link}
              onClick={() => handleNavClick(2)}
            >
              <img src={Complete} alt="Completed" />
              <span>Completed</span>
            </div>

            <div
              className={styles.Admin_link}
              onClick={() => handleNavClick(3)}
            >
              <img src={Post} alt="Publish" />
              <span>Publish</span>
            </div>
          </div>

          {/* Logout Button */}
          <img
            className={styles.Out}
            src={Logout}
            alt="Logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          />
        </div>

        {navCount === 1 && <Inquiries />}
        {navCount === 2 && <Completed />}
        {navCount === 3 && <Publish />}
      </div>
    </div>
  );
};

export default Admin;
