import { useRouter } from "next/router"
import ProgressBar from "./ProgressBar";
import styles from '../styles/Layout.module.css'

const Layout: React.FC = ({ children }) => {
    const router = useRouter();
    return (
      <div className={router.asPath === "/" ? styles.home : styles.quiz}>
        {/* {router.asPath !== "/" &&  <ProgressBar />} */}
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    );
}

export default Layout;