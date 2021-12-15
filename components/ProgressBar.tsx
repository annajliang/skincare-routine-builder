import styles from '../styles/ProgressBar.module.css'

const ProgressBar: React.FC<{ index: number }> = ({ index }) => {
    console.log('progress bar', index+1)
    const percentage = 10 * (index+1) + '%'
    console.log('percentage', percentage)
    return (
      <div className={styles.progressBar}>
        <span className={styles.progress} style={{ width: percentage }}></span>
      </div>
    );
}

export default ProgressBar