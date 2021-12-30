import React, { useContext, useState, useEffect } from "react";
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

interface IMorningRoutineContext {
  morningRoutine: IProduct[];
  setMorningRoutine: (arr: IProduct[]) => void;
}

interface INightRoutineContext {
  nightRoutine: IProduct[];
  setNightRoutine: (arr: IProduct[]) => void;
}

export const MorningRoutineContext =
  React.createContext<IMorningRoutineContext>({
    morningRoutine: [],
    setMorningRoutine: function (arr: IProduct[]) {},
  });

export const NightRoutineContext = React.createContext<INightRoutineContext>({
  nightRoutine: [],
  setNightRoutine: function (arr: IProduct[]) {},
});

const Calculating = () => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [showPreResults, setShowPreResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [morningRoutine, setMorningRoutine] = useState<Array<IProduct>>([]);
  const [nightRoutine, setNightRoutine] = useState<Array<IProduct>>([]);

  const { userChoices } = useContext(UserChoicesContext);
  const { recommendedProducts, setRecommendedProducts } =
    useContext(RecommendedContext);
  const { routineTheme } = useContext(RoutineContext);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const evaluateAnswers = () => {
      console.log("userChoices", userChoices);
      let productCommands: ICommand[] = [];

      userChoices.forEach((userChoice, i) => {
        const index = userChoice.answer;
        const filteredProducts = questions[i].options[index].filterFn(products);
        const flattenedFilteredProducts = filteredProducts.flat();

        productCommands.push(...flattenedFilteredProducts);
      });

      const productsToAdd = productCommands.filter((product) => {
        return product.action === "add";
      });

      const productsToRemove = productCommands.filter((product) => {
        return product.action === "remove";
      });

      // console.log("products", productCommands);
      console.log("productsToAdd", productsToAdd);
      console.log("productsToRemove", productsToRemove);
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

  useEffect(() => {
    const morningRoutineCopy: IProduct[] = [];
    const nightRoutineCopy: IProduct[] = [];

    const addProduct = (
      _filteredProducts: IProduct[],
      arr1: IProduct[],
      arr2: IProduct[] | undefined
    ) => {
      if (_filteredProducts.length > 1) {
        const index = Math.floor(Math.random() * _filteredProducts.length);
        arr1.push(_filteredProducts[index]);

        if (arr2 !== undefined) {
          arr2.push(_filteredProducts[index]);
        }
      } else {
        arr1.push(..._filteredProducts);
        if (arr2 !== undefined) {
          arr2.push(..._filteredProducts);
        }
      }
    };

    const findMoisturizerWithSpf = (arr: IProduct[]) => {
      const filteredProducts = recommendedProducts.filter(
        (recommendedProduct) =>
          recommendedProduct.category === "moisturizer" &&
          recommendedProduct.spf
      );

      // if there are more than 1 found product, pick a random one
      addProduct(filteredProducts, arr, undefined);
    };

    const findMoisturizerWithoutSpf = (arr: IProduct[]) => {
      const filteredProducts = recommendedProducts.filter(
        (recommendedProduct) =>
          recommendedProduct.category === "moisturizer" &&
          !recommendedProduct.spf
      );

      console.log("findMoisturizerWithoutSpf", filteredProducts);

      // if there are more than 1 found product, pick a random one
      addProduct(filteredProducts, arr, undefined);
    };

    const findProduct = (
      productType: string,
      arr1: IProduct[],
      arr2: IProduct[] | undefined
    ) => {
      const filteredProducts = recommendedProducts.filter(
        (recommendedProduct) => recommendedProduct.category === productType
      );

      // if there are more than 1 found product, pick a random one
      addProduct(filteredProducts, arr1, arr2);
    };

    if (morningRoutine.length === 0) {
      if (userChoices[2].answer === 0) {
        findMoisturizerWithSpf(morningRoutineCopy);
        findMoisturizerWithoutSpf(nightRoutineCopy);
      } else {
        findProduct("moisturizer", morningRoutineCopy, nightRoutineCopy);
      }

      findProduct("cleanser", morningRoutineCopy, nightRoutineCopy);
      findProduct("sunscreen", morningRoutineCopy, undefined);
      findProduct("makeup_remover", nightRoutineCopy, undefined);
      findProduct("treatment", morningRoutineCopy, nightRoutineCopy);
      // optional
      userChoices[2].answer !== 0 &&
        findProduct("toner", morningRoutineCopy, nightRoutineCopy);

      setMorningRoutine(morningRoutineCopy);
      setNightRoutine(nightRoutineCopy);
    }
  }, [morningRoutine, nightRoutine, recommendedProducts, userChoices]);

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

      <MorningRoutineContext.Provider
        value={{ morningRoutine, setMorningRoutine }}
      >
        <NightRoutineContext.Provider value={{ nightRoutine, setNightRoutine }}>
          {showResults && !showPreResults && routineTheme === "morning" && (
            <Morning />
          )}
          {showResults && !showPreResults && routineTheme === "night" && (
            <Night />
          )}
        </NightRoutineContext.Provider>
      </MorningRoutineContext.Provider>
    </>
  );
};

export default Calculating;
