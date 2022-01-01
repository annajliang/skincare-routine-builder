import React, { useContext, useState, useEffect } from "react";
import { useCalcProducts } from "./useCalcProducts";
import { useRoutines } from "./useRoutines";
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
  action: "add" | "remove";
  product: IProduct;
}

interface IMorningRoutineContext {
  morningRoutine: IProduct[];
  setMorningRoutine: (arr: IProduct[]) => void 
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

const Calculating: React.FC = () => {
  // const [isCalculating, setIsCalculating] = useState(true);
  // const [showPreResults, setShowPreResults] = useState(false);
  // const [showResults, setShowResults] = useState(false);
  // const [morningRoutine, setMorningRoutine] = useState<Array<IProduct>>([]);
  // const [nightRoutine, setNightRoutine] = useState<Array<IProduct>>([]);

  // const { userChoices } = useContext(UserChoicesContext);
  // const { recommendedProducts, setRecommendedProducts } =
  //   useContext(RecommendedContext);
  const { routineTheme } = useContext(RoutineContext);
  // const { products } = useContext(ProductContext);

  const {isCalculating, showResults, showPreResults} = useCalcProducts();
  const {morningRoutine, nightRoutine, setMorningRoutine, setNightRoutine} =
    useRoutines();

  // useEffect(() => {
  //   const evaluateAnswers = () => {
  //     // console.log("userChoices", userChoices);
  //     // todo use map rather than foreachs
  //     let productCommands: ICommand[] = [];

  //     // get products for each question
  //     userChoices.forEach((userChoice, i) => {
  //       const index = userChoice.answer;
  //       const filterFn = questions[i].options[index].filterFn;
  //       const filteredProducts = filterFn ? filterFn(products) : [];

  //       productCommands.push(...filteredProducts);
  //     });

  //     const addCommands = productCommands.filter((productCommand) => {
  //       return productCommand.action === "add";
  //     });

  //     const removeCommands = productCommands.filter((productCommand) => {
  //       return productCommand.action === "remove";
  //     });

  //     // console.log("products", productCommands);
  //     // console.log("productsToAdd", addCommands);
  //     // console.log("productsToRemove", removeCommands);
  //     const results = removeProducts(addCommands, removeCommands);

  //     const finalProducts = results.map((productCommand) => {
  //       return productCommand.product;
  //     });
  //     // console.log("RESULTS", finalProducts);
  //     setRecommendedProducts(finalProducts);
  //   };

  //   setTimeout(() => {
  //     setIsCalculating(false);
  //     setShowPreResults(true);
  //     setTimeout(() => {
  //       setShowPreResults(false);
  //       setShowResults(true);
  //     }, 2000);

  //     evaluateAnswers();
  //   }, 4000);
  // }, [products, setRecommendedProducts, userChoices]);

  // useEffect(() => {
  //   const unsortedMorningRoutine: IProduct[] = [];
  //   const unsortedNightRoutine: IProduct[] = [];

  //   const addProduct = (
  //     _filteredProducts: IProduct[],
  //     morningRoutine: IProduct[],
  //     nightRoutine: IProduct[] | undefined
  //   ) => {
  //     // find random product if more than one product in a category exists
  //     if (_filteredProducts.length > 1) {
  //       const index = Math.floor(Math.random() * _filteredProducts.length);
  //       morningRoutine.push(_filteredProducts[index]);

  //       if (nightRoutine !== undefined) {
  //         nightRoutine.push(_filteredProducts[index]);
  //       }
  //     } else {
  //       morningRoutine.push(..._filteredProducts);
  //       if (nightRoutine !== undefined) {
  //         nightRoutine.push(..._filteredProducts);
  //       }
  //     }
  //   };

  //   const findMoisturizerWithSpf = (products: IProduct[]) => {
  //     const filteredProducts = recommendedProducts.filter(
  //       (recommendedProduct) =>
  //         recommendedProduct.category === "moisturizer" &&
  //         recommendedProduct.spf
  //     );

  //     // if there are more than 1 found product, pick a random one
  //     addProduct(filteredProducts, products, undefined);
  //   };

  //   const findMoisturizerWithoutSpf = (products: IProduct[]) => {
  //     const filteredProducts = recommendedProducts.filter(
  //       (recommendedProduct) =>
  //         recommendedProduct.category === "moisturizer" &&
  //         !recommendedProduct.spf
  //     );

  //     // if there are more than 1 found product, pick a random one
  //     addProduct(filteredProducts, products, undefined);
  //   };

  //   const findAndAddProduct = (
  //     productType: string,
  //     morningRoutine: IProduct[],
  //     nightRoutine: IProduct[] | undefined
  //   ) => {
  //     const filteredProducts = recommendedProducts.filter(
  //       (recommendedProduct) => recommendedProduct.category === productType
  //     );

  //     // if there are more than 1 found product, pick a random one
  //     addProduct(filteredProducts, morningRoutine, nightRoutine);
  //   };

  //   if (morningRoutine.length === 0) {
  //     if (userChoices[2].answer === 0) {
  //       findMoisturizerWithSpf(unsortedMorningRoutine);
  //       findMoisturizerWithoutSpf(unsortedNightRoutine);
  //     } else {
  //       findAndAddProduct(
  //         "moisturizer",
  //         unsortedMorningRoutine,
  //         unsortedNightRoutine
  //       );
  //     }

  //     findAndAddProduct(
  //       "cleanser",
  //       unsortedMorningRoutine,
  //       unsortedNightRoutine
  //     );
  //     findAndAddProduct("sunscreen", unsortedMorningRoutine, undefined);
  //     findAndAddProduct("makeup_remover", unsortedNightRoutine, undefined);
  //     findAndAddProduct(
  //       "treatment",
  //       unsortedMorningRoutine,
  //       unsortedNightRoutine
  //     );
  //     // optional
  //     userChoices[2].answer !== 0 &&
  //       findAndAddProduct(
  //         "toner",
  //         unsortedMorningRoutine,
  //         unsortedNightRoutine
  //       );

  //     // sort the morning routine products in its correct position
  //     const sortedMorningRoutine = [];
  //     const sortedNightRoutine = [];

  //     for (const product of unsortedMorningRoutine) {
  //       if (product.category === "cleanser") {
  //         sortedMorningRoutine[0] = product;
  //       } else if (product.category === "toner") {
  //         sortedMorningRoutine[1] = product;
  //       } else if (product.category === "treatment") {
  //         sortedMorningRoutine[2] = product;
  //       } else if (product.category === "moisturizer" && !product.spf) {
  //         sortedMorningRoutine[3] = product;
  //       } else if (
  //         product.category === "sunscreen" ||
  //         (product.category === "moisturizer" && product.spf)
  //       ) {
  //         sortedMorningRoutine[4] = product;
  //       }
  //     }

  //     // sort the night routine products in its correct position
  //     for (const product of unsortedNightRoutine) {
  //       if (product.category === "makeup_remover") {
  //         sortedNightRoutine[0] = product;
  //       } else if (product.category === "cleanser") {
  //         sortedNightRoutine[1] = product;
  //       } else if (product.category === "toner") {
  //         sortedNightRoutine[2] = product;
  //       } else if (product.category === "treatment") {
  //         sortedNightRoutine[3] = product;
  //       } else if (product.category === "moisturizer" && !product.spf) {
  //         sortedNightRoutine[4] = product;
  //       }
  //     }

  //     // remove empty array slots with filter
  //     setMorningRoutine(sortedMorningRoutine.filter((n) => n));
  //     setNightRoutine(sortedNightRoutine.filter((n) => n));
  //   }
  // }, [morningRoutine, nightRoutine, recommendedProducts, userChoices]);

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
            {routineTheme === "morning" ? (
              <Image
                src="/loading.svg"
                alt=""
                width={300}
                height={300}
                priority
              />
            ) : (
              <Image
                src="/nightLoading.svg"
                alt=""
                width={300}
                height={300}
                priority
              />
            )}
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
            {routineTheme === "morning" ? (
              <Image
                src="/loaded.svg"
                alt=""
                width={300}
                height={300}
                priority
              />
            ) : (
              <Image
                src="/nightLoaded.svg"
                alt=""
                width={300}
                height={300}
                priority
              />
            )}
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
