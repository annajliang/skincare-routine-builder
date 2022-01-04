import questions from "../data/questions";
import { useRouter } from "next/router";
import { Animated } from "react-animated-css";
import Option from "./Option";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";

const StyledQuestion = styled.div`
  width: 80%;
  margin: 0 auto;

  h1 {
    margin-bottom: 4rem;
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 4.5rem;
      /* display: block; */
      line-height: 1.1;
    }
    
    h1 span:first-child {
      margin-right: 1rem;
    }
  }
`;

const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 28rem;

  @media (max-width: 1000px) {
    display: block;
    height: 7rem;
  }
`;

const Question: React.FC = () => {
  const route = useRouter();

  return (
    <StyledQuestion>
      {questions.map((question, i) => {
        return (
          <>
            {route.asPath === `/question/${i + 1}` && (
              <ProgressBar index={i} key={i} />
            )}
            {route.asPath === `/question/${i + 1}` && (
              <Animated
                animationIn="fadeInRight"
                animationOut="fadeOutLeft"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}
              >
                <h1>
                  <span>{questions[i].questionSpanOne}</span>
                  <span>{questions[i].questionSpanTwo}</span>
                </h1>
                <StyledGrid>
                  {question.options.map((option, j) => {
                    return (
                      <Option
                        key={i + j}
                        index={i}
                        question={`${questions[i].questionSpanOne} ${questions[i].questionSpanTwo}`}
                        optionId={option.id}
                      >
                        {option.text}
                      </Option>
                    );
                  })}
                </StyledGrid>
              </Animated>
            )}
          </>
        );
      })}
    </StyledQuestion>
  );
};;

export default Question;