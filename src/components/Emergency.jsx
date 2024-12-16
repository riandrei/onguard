import { useState } from 'react'

import styles from '../css/Emergency.module.css'
import Location from '../assets/Location.webp'
import End from '../assets/end.png'
import Video from '../assets/video.png'
import Video2 from '../assets/videoWhite.png'
import Close from '../assets/close.png'

const Emergency = ({handleCallClick}) => {

    const [video, setVideo] = useState(false)
    const handleVideoClick = () => {
        setVideo( !video )
        console.log(video)
    }

    return(
        <div className={styles.Emergency}>
            <div className={styles.Head}>
                <h1>Emergency Call</h1>
                <img src={Close} onClick={handleCallClick} />
            </div>
            <div className={styles.Emergency_inner}>
                <img  src={Location} className={styles.Location}/>
                <div className={styles.Location_details}>
                    <h2>Enter your message(optional):</h2>
                    <textarea name="" id=""></textarea>
                    <div className={styles.End}>
                        <img src={End} />
                        {
                            video ? <img onClick={handleVideoClick} src={Video2} /> : <img onClick={handleVideoClick} src={Video} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emergency;