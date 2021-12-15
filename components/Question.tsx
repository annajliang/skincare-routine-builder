// import questions from "../data/questions";
// import { useRouter } from "next/router";
// import Option from "../components/Option";
// import ProgressBar from "../components/ProgressBar";
// import styles from "../styles/Question.module.css";

// const Question: React.FC = () => {
//   const route = useRouter();

//   return (
//     <div className={styles.container}>
//       {questions.map((question, i) => {
//         return (
//           <>
//             {route.asPath === `/question/${i + 1}` && <ProgressBar index={i} />}
//             {route.asPath === `/question/${i + 1}` && (
//               <div>
//                 <h1 className={styles.questionTitle}>
//                   <span>{questions[i].questionSpanOne}</span>
//                   <span>{questions[i].questionSpanTwo}</span>
//                 </h1>
//                 <div className={styles.gridContainer}>
//                   <Option index={i}>{questions[i].option1}</Option>
//                   <Option index={i}>{questions[i].option2}</Option>
//                   <Option index={i}>{questions[i].option3}</Option>
//                   <Option index={i}>{questions[i].option4}</Option>
//                 </div>
//               </div>
//             )}
//           </>
//         );
//       })}
//     </div>
//   );
// };

// export default Question;

// import questions from "../data/questions";
// import { useRouter } from "next/router";
// import Option from "../components/Option";
// import ProgressBar from "../components/ProgressBar";
// import styles from "../styles/Question.module.css";

// const Question: React.FC = () => {
//   const route = useRouter();

//   return (
//     <div className={styles.container}>
//       {questions.map((question, i) => {
//         return (
//           <>
//             {route.asPath === `/question/${i + 1}` && <ProgressBar index={i} />}
//             {route.asPath === `/question/${i + 1}` && (
//               <div>
//                 <h1 className={styles.questionTitle}>
//                   <span>{questions[i].questionSpanOne}</span>
//                   <span>{questions[i].questionSpanTwo}</span>
//                 </h1>
//                 <div className={styles.gridContainer}>
//                   {question.options.map((option, j) => {
//                     return <Option key={i} index={i} test={j}>{option}</Option>;
//                   })}
//                 </div>
//               </div>
//             )}
//           </>
//         );
//       })}
//     </div>
//   );
// };

// export default Question;

import questions from "../data/questions";
import { useRouter } from "next/router";
import Option from "../components/Option";
import ProgressBar from "../components/ProgressBar";
import styles from "../styles/Question.module.css";

const Question: React.FC = () => {
  const route = useRouter();

  return (
    <div className={styles.container}>
      {questions.map((question, i) => {
        return (
          <>
            {route.asPath === `/question/${i + 1}` && <ProgressBar index={i} />}
            {route.asPath === `/question/${i + 1}` && (
              <div>
                <h1 className={styles.questionTitle}>
                  <span>{questions[i].questionSpanOne}</span>
                  <span>{questions[i].questionSpanTwo}</span>
                </h1>
                <div className={styles.gridContainer}>
                  {question.options.map((option) => {
                    return (
                      <Option key={i} index={i}>
                        {option}
                      </Option>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Question;