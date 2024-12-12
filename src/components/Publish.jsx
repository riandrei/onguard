import styles from '../css/Publish.module.css'

const Publish = () => {
    return(
        <div className={styles.Publish}>
            <div className={styles.Headline}>
                <span>Headline:</span>
                <input type="text" maxLength={40}/>
            </div>

            <div className={styles.Description}>
                <span>Description:</span>
                <textarea></textarea>
            </div>

            <div className={styles.File}>
                <span>Upload image:</span>
                <input type="file" accept="image/*" />
            </div>
            <button>Publish</button>
        </div>
    )
}

export default Publish;