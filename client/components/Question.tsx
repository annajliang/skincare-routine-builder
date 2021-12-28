import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import { useRouter } from "next/router";
import { Animated } from "react-animated-css";
import { IProduct } from "../../pages/_app";
import Option from "./Option";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";

const StyledQuestion = styled.div`
  width: 80%;
  margin: 0 auto;

  h1 {
    margin-bottom: 4rem;
  }
`;

const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 28rem;
`;

const Question: React.FC = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
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
                        products={products}
                      >
                        {option}
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