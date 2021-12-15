import Link from "next/link";
import questions from '../data/questions';
import styles from "../styles/Option.module.css";

const Option: React.FC<{ children: string, index: number }> = ({ children, index }) => {
  // console.log("children", children);
  return (
    <Link href={index < questions.length-1 ? `/question/${questions[index + 1].id}` : '/'}>
      <a className={styles.gridItem}>{children}</a>
    </Link>
  );
};

export default Option;
