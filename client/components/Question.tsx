import { useState, useEffect } from "react";
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
`;

const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 28rem;
`;

export interface IUserChoices {
  id: string,
  question: string,
  answer: string | undefined
}

interface IProducts {
  name: string;
  description: string;
  img_url: string;
  ingredients: string;
  texture: string;
  price_range: string;
  skin_type: string[];
  has_fragrance: boolean;
  has_alcohol?: boolean;
  is_waterproof?: boolean; 
  is_tinted?: boolean;
  removes_makeup?: boolean; 
  spf?: number; 
  sunscreen_type?: string[]; 
  category: string
}


const Question: React.FC = () => {
  const [userChoices, setUserChoices] = useState<Array<IUserChoices>>([]);
  const [products, setProducts] = useState<Array<IProducts>>([]);
  const route = useRouter();

  console.log("userChoices", userChoices);

  useEffect(() => {
    console.log("rendered");

    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        console.log("response", response);

        if (response.ok) {
          const data = await response.json();
          // console.log("data", data.data);
          setProducts([...data.data]);
          
        } else {
          throw new Error(response.statusText);
        }

      } catch (err) {
        console.error(err);
      }
    }

    getProducts()
    
  }, []);

    if (products.length !== 0) {
      console.log('products',products);
    }
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
                        userChoices={userChoices}
                        setUserChoices={setUserChoices}
                        question={`${questions[i].questionSpanOne} ${questions[i].questionSpanTwo}`}
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
};

export default Question;