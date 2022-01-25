import { useContext, useEffect, useState } from "react";
import { ICommand } from "./Calculating";
import questions from "../../data/questions";
import { removeDuplicateProducts } from "../../utils/helpers";
import {
  UserChoicesContext,
  ProductContext,
  RecommendedContext,
  IProduct,
} from "../../../pages/_app";

export const useCalcProducts = () => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [showPreResults, setShowPreResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { userChoices } = useContext(UserChoicesContext);
  const { setRecommendedProducts } = useContext(RecommendedContext);
  const { products } = useContext(ProductContext);

  const getAllCommands = () => {
    return userChoices.reduce((accum: ICommand[], userChoice, i) => {
      const index = userChoice.answer;
      const filterFn = questions[i].options[index].filterFn;
      const filteredProducts = filterFn ? filterFn(products) : [];

      return [...accum, ...filteredProducts];
    }, []);
  };

  const getAddCommands = (_productCommands: ICommand[]) => {
    return _productCommands.filter((productCommand) => {
      return productCommand.action === "add";
    });
  };

  const getRemoveCommands = (_productCommands: ICommand[]) => {
    return _productCommands.filter((productCommand) => {
      return productCommand.action === "remove";
    });
  };

  const getFinalProducts = (_finalAddCommands: ICommand[]) => {
    return _finalAddCommands.map((addCommand) => {
      return addCommand.product;
    });
  };

  useEffect(() => {
    const handleProducts = () => {
      const allCommands = getAllCommands();
      const addCommands = getAddCommands(allCommands);
      const removeCommands = getRemoveCommands(allCommands);
      const finalAddCommands = removeDuplicateProducts(addCommands, removeCommands);
      const finalProducts = getFinalProducts(finalAddCommands);

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

        handleProducts();
      }, 4000);
    } else {
      setShowPreResults(false);
      setShowResults(true);
      handleProducts();
    }
  }, [products, setRecommendedProducts, userChoices]);
  return { isCalculating, showResults, showPreResults };
};
