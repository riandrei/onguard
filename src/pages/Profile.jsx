import React, { useState } from 'react';
import styles from '../css/Profile.module.css';

import Nav from '../components/Nav';

import Miko from '../assets/Miko.jpg';

const Profile = ({ handleNavClick, navCount }) => {
    const [isEditable, setIsEditable] = useState(false);

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    return (
        <div className={styles.Profile}>
            <Nav />
            <div className={styles.Profile_body}>
                <div className={styles.Profile_left}>
                    <img src={Miko} alt="Profile" />
                    <label htmlFor="dp">Upload Profile Picture</label>
                    <input id="dp" type="file" accept="image/*" disabled={!isEditable} />
                    <button>Log Out</button>
                </div>

                <div className={styles.Profile_right}>
                    <div className={styles.Password}>
                        <span>Personal Details:</span>
                        <div className={styles.Password_inner}>
                            <div className={styles.Password_inner2}>
                                <label>New password:</label>
                                <input type="text" disabled={!isEditable} />
                            </div>
                            <div className={styles.Password_inner2}>
                                <label>Confirm New Password:</label>
                                <input type="text" disabled={!isEditable} />
                            </div>
                        </div>

                        <div className={styles.Password_inner3}>
                            <label>Address:</label>
                            <input type="text" disabled={!isEditable} />
                        </div>

                        <div className={styles.Password_inner}>
                            <div className={styles.Password_inner2}>
                                <label>New password:</label>
                                <input type="text" disabled={!isEditable} />
                            </div>
                            <div className={styles.Password_inner2}>
                                <label>Confirm New Password:</label>
                                <input type="text" disabled={!isEditable} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.Password}>
                        <span>Change password:</span>
                        <div className={styles.Password_inner}>
                            <div className={styles.Password_inner2}>
                                <label>New password:</label>
                                <input type="password" disabled={!isEditable} />
                            </div>
                            <div className={styles.Password_inner2}>
                                <label>Confirm New Password:</label>
                                <input type="password" disabled={!isEditable} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.Save}>
                        <button>SAVE</button>
                        <button onClick={handleEditClick}>
                            {isEditable ? 'LOCK' : 'EDIT'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
