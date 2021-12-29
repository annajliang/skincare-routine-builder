import {
  IProduct,
  RecommendedContext,
  UserChoicesContext,
  RoutineContext,
} from "../../pages/_app";
import ProductCard from "./ProductCard";
import React, { useContext, useState, useEffect } from "react";

const Routine = () => {
  const { recommendedProducts } = useContext(RecommendedContext);
  const { userChoices } = useContext(UserChoicesContext);
  const [morningRoutine, setMorningRoutine] = useState<Array<IProduct>>([]);
  const [nightRoutine, setNightRoutine] = useState<Array<IProduct>>([]);
  const { routineTheme } = useContext(RoutineContext);

  useEffect(() => {
    // console.log("product card", recommendedProducts);

    const morningRoutineCopy: IProduct[] = [];
    const nightRoutineCopy: IProduct[] = [];

    const addProduct = (_filteredProducts: IProduct[], arr1: IProduct[], arr2: IProduct[] | undefined) => {
      if (_filteredProducts.length > 1) {
        const index = Math.floor(Math.random() * _filteredProducts.length);
        arr1.push(_filteredProducts[index]);

        if (arr2 !== undefined) {
          arr2.push(_filteredProducts[index]);
        }
      } 
      else {
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
      userChoices[2].answer !== 0 && findProduct("toner", morningRoutineCopy, nightRoutineCopy);

      setMorningRoutine(morningRoutineCopy);
      setNightRoutine(nightRoutineCopy);
    }
  }, [morningRoutine, nightRoutine, recommendedProducts, userChoices]);

  if (morningRoutine.length !== 0 && nightRoutine.length !== 0) {
    console.log("morningRoutine", morningRoutine);
    console.log("nightRoutine", nightRoutine);
  }

  return (
    <>
      {routineTheme === "morning" &&
        morningRoutine.length !== 0 &&
        morningRoutine.map((recommendedProduct: IProduct, i: number) => {
          return (
            <ProductCard recommendedProduct={recommendedProduct} key={i} />
          );
        })}

      {routineTheme === "night" &&
        nightRoutine.length !== 0 &&
        nightRoutine.map((recommendedProduct: IProduct, i: number) => {
          return (
            <ProductCard recommendedProduct={recommendedProduct} key={i} />
          );
        })}
    </>
  );
};

export default Routine;
