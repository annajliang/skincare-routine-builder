import { useContext, useState, useEffect } from "react";
import questions from "../data/questions";
import {
  RoutineContext,
  UserChoicesContext,
  IProduct,
  ProductContext,
  RecommendedContext,
} from "../../pages/_app";
import Morning from "./Morning";
import Night from "./Night";
import { removeProducts } from "../utils/helpers";
import Image from "next/image";
import { Animated } from "react-animated-css";
import styled from "styled-components";

const StyledCentered = styled.div`
  margin: auto;
  text-align: center;
`;

export interface ICommand {
  action: "add" | "remove" | "nothing";
  product: IProduct;
}

const Calculating = () => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [showPreResults, setShowPreResults] = useState(false);
  const [showResults, setShowResults] = useState(false);


  const { userChoices } = useContext(UserChoicesContext);
  const { setRecommendedProducts} = useContext(RecommendedContext);
  const { routineTheme } = useContext(RoutineContext);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const evaluateAnswers = () => {
      console.log("userChoices", userChoices);
      let productCommands: ICommand[] = [];

        userChoices.forEach((userChoice, i) => {
          const index = userChoice.answer
          const filteredProducts = questions[i].options[index].filterFn(products);
          const flattenedFilteredProducts = filteredProducts.flat();

          productCommands.push(...flattenedFilteredProducts);
        })

        const productsToAdd = productCommands.filter((product) => {
          return product.action === "add";
        });

        const productsToRemove = productCommands.filter((product) => {
          return product.action === "remove";
        });

        // console.log("productsToAdd", productsToAdd);
        // console.log("productsToRemove", productsToRemove);
        const results = removeProducts(productsToAdd, productsToRemove);

        const finalProducts: IProduct[] = results.map((product) => {
          return product.product;
        });
        console.log("RESULTS", finalProducts);
        setRecommendedProducts(finalProducts);
    };

    setTimeout(() => {
      setIsCalculating(false);
      setShowPreResults(true);
      setTimeout(() => {
        setShowPreResults(false);
        setShowResults(true);
      }, 100);

      evaluateAnswers();
    }, 100);
  }, []);
  
  return (
    <>
      {isCalculating && (
        <StyledCentered>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <h1>
              <span>Calculating</span> <span>routine...</span>
            </h1>
            <Image
              src="/loading.svg"
              alt=""
              width={300}
              height={300}
              priority
            />
          </Animated>
        </StyledCentered>
      )}

      {showPreResults && (
        <StyledCentered>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <h1>
              <span>Your results</span> <span>are in!</span>
            </h1>
            <Image src="/loaded.svg" alt="" width={300} height={300} priority />
          </Animated>
        </StyledCentered>
      )}

      {showResults && !showPreResults && routineTheme === 'morning' && <Morning />}
      {showResults && !showPreResults && routineTheme === 'night' && <Night />}
    </>
  );
};

export default Calculating;
