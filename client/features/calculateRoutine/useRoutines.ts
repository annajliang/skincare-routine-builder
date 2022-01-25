import { useContext, useEffect, useState } from "react";
import {
  UserChoicesContext,
  IProduct,
  RecommendedContext,
} from "../../../pages/_app";

export const useRoutines = (_recommendedProducts: IProduct[]) => {
  const [morningRoutine, setMorningRoutine] = useState<Array<IProduct>>([]);
  const { userChoices } = useContext(UserChoicesContext);
  const { recommendedProducts } = useContext(RecommendedContext);
  const [nightRoutine, setNightRoutine] = useState<Array<IProduct>>([]);
  const [changeRoutine, setChangeRoutine] = useState(false);

  useEffect(() => {
    const unsortedMorningRoutine: IProduct[] = [];
    const unsortedNightRoutine: IProduct[] = [];

    const addProduct = (
      _filteredProducts: IProduct[],
      morningRoutine: IProduct[],
      nightRoutine: IProduct[] | undefined
    ) => {
      // find random product if more than one product in a category exists
      if (_filteredProducts.length > 1) {
        const index = Math.floor(Math.random() * _filteredProducts.length);
        morningRoutine.push(_filteredProducts[index]);

        if (nightRoutine !== undefined) {
          nightRoutine.push(_filteredProducts[index]);
        }
      } else {
        morningRoutine.push(..._filteredProducts);
        if (nightRoutine !== undefined) {
          nightRoutine.push(..._filteredProducts);
        }
      }
    };

    const findAndAddMoisturizerWithSpf = (products: IProduct[]) => {
      const filteredProducts = _recommendedProducts.filter(
        (recommendedProduct) =>
          recommendedProduct.category === "moisturizer" &&
          recommendedProduct.spf
      );

      // if there are more than 1 found product, pick a random one
      addProduct(filteredProducts, products, undefined);
    };

    const findAndAddMoisturizerWithoutSpf = (products: IProduct[]) => {
      const filteredProducts = _recommendedProducts.filter(
        (recommendedProduct) =>
          recommendedProduct.category === "moisturizer" &&
          !recommendedProduct.spf
      );

      // if there are more than 1 found product, pick a random one
      addProduct(filteredProducts, products, undefined);
    };

    const findAndAddProduct = (
      productType: string,
      morningRoutine: IProduct[],
      nightRoutine: IProduct[] | undefined
    ) => {
      const filteredProducts = _recommendedProducts.filter(
        (recommendedProduct) => recommendedProduct.category === productType
      );

      // if there are more than 1 found product, pick a random one
      addProduct(filteredProducts, morningRoutine, nightRoutine);
    };

    if ((_recommendedProducts.length > 0 && morningRoutine.length === 0 && nightRoutine.length === 0) || changeRoutine) {
      if (userChoices[2].answer === 0) {
        findAndAddMoisturizerWithSpf(unsortedMorningRoutine);
        findAndAddMoisturizerWithoutSpf(unsortedNightRoutine);
      } else {
        findAndAddProduct(
          "moisturizer",
          unsortedMorningRoutine,
          unsortedNightRoutine
        );
      }

      findAndAddProduct(
        "cleanser",
        unsortedMorningRoutine,
        unsortedNightRoutine
      );
      findAndAddProduct("sunscreen", unsortedMorningRoutine, undefined);
      findAndAddProduct("makeup_remover", unsortedNightRoutine, undefined);
      findAndAddProduct(
        "treatment",
        unsortedMorningRoutine,
        unsortedNightRoutine
      );
      // optional
      userChoices[2].answer !== 0 &&
        findAndAddProduct(
          "toner",
          unsortedMorningRoutine,
          unsortedNightRoutine
        );

      // sort the morning routine products in its correct position
      const sortedMorningRoutine = [];
      const sortedNightRoutine = [];

      for (const product of unsortedMorningRoutine) {
        if (product.category === "cleanser") {
          sortedMorningRoutine[0] = product;
        } else if (product.category === "toner") {
          sortedMorningRoutine[1] = product;
        } else if (product.category === "treatment") {
          sortedMorningRoutine[2] = product;
        } else if (product.category === "moisturizer" && !product.spf) {
          sortedMorningRoutine[3] = product;
        } else if (
          product.category === "sunscreen" ||
          (product.category === "moisturizer" && product.spf)
        ) {
          sortedMorningRoutine[4] = product;
        }
      }

      // sort the night routine products in its correct position
      for (const product of unsortedNightRoutine) {
        if (product.category === "makeup_remover") {
          sortedNightRoutine[0] = product;
        } else if (product.category === "cleanser") {
          sortedNightRoutine[1] = product;
        } else if (product.category === "toner") {
          sortedNightRoutine[2] = product;
        } else if (product.category === "treatment") {
          sortedNightRoutine[3] = product;
        } else if (product.category === "moisturizer" && !product.spf) {
          sortedNightRoutine[4] = product;
        }
      }

      // remove empty array slots with filter
      setMorningRoutine(sortedMorningRoutine.filter((n) => n));
      setNightRoutine(sortedNightRoutine.filter((n) => n));
      setChangeRoutine(false);
    }
  }, [
    morningRoutine,
    nightRoutine,
    _recommendedProducts,
    userChoices,
    changeRoutine,
  ]);
  return { morningRoutine, nightRoutine, setMorningRoutine, setNightRoutine, setChangeRoutine};
};