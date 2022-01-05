import { useContext, useEffect, useState } from "react";
import { ICommand } from "./Calculating";
import questions from "../../data/questions";
import { removeProducts } from "../../utils/helpers";
import {
  UserChoicesContext,
  ProductContext,
  RecommendedContext,
} from "../../../pages/_app";

export const useCalcProducts = () => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [showPreResults, setShowPreResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { userChoices } = useContext(UserChoicesContext);
  const { recommendedProducts, setRecommendedProducts } =
    useContext(RecommendedContext);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    console.log("userChoices", userChoices);
    const evaluateAnswers = () => {
      // console.log("userChoices", userChoices);
      // todo use map rather than foreachs
      let productCommands: ICommand[] = [];

      // get products for each question
      userChoices.forEach((userChoice, i) => {
        const index = userChoice.answer;
        const filterFn = questions[i].options[index].filterFn;
        const filteredProducts = filterFn ? filterFn(products) : [];

        productCommands.push(...filteredProducts);
      });

      const addCommands = productCommands.filter((productCommand) => {
        return productCommand.action === "add";
      });

      const removeCommands = productCommands.filter((productCommand) => {
        return productCommand.action === "remove";
      });

      // console.log("products", productCommands);
      // console.log("productsToAdd", addCommands);
      // console.log("productsToRemove", removeCommands);
      const results = removeProducts(addCommands, removeCommands);

      const finalProducts = results.map((productCommand) => {
        return productCommand.product;
      });
      setRecommendedProducts(finalProducts);
    };

    if (userChoices.length !== 0) {
      setTimeout(() => {
        setIsCalculating(false);
        setShowPreResults(true);
        setTimeout(() => {
          setShowPreResults(false);
          setShowResults(true);
        }, 2000);

        evaluateAnswers();
      }, 4000);
    } else {
      setShowPreResults(false);
      setShowResults(true);
      evaluateAnswers();
    }
  }, [products, setRecommendedProducts, userChoices]);
  return { isCalculating, showResults, showPreResults };
};
