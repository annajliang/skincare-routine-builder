import { IProduct } from "../../pages/_app";
import { ICommand } from "../components/Calculating";

export const removeProducts = (arr1: ICommand[], arr2: ICommand[]) => {
  return arr1.filter((x) => {
    return arr2.findIndex((t) => t.product.name === x.product.name) === -1;
  });
};

export const filterQuestion1 = (arr: IProduct[], skinType: string) => {
  return arr
    .filter(
      (product) =>
        product.skin_type?.includes("all") ||
        product.skin_type?.includes(skinType)
    )
    .map((product) => {
      return [
        {
          action: "add",
          product,
        },
      ];
    });
};

export const filterQuestion2 = (arr: IProduct[], skinConcern: string) => {
  return arr
    .filter(
      (product) =>
        product.skin_concerns?.includes(skinConcern) &&
        product.category === "treatment"
    )
    .map((product) => {
      return [
        {
          action: "add",
          product,
        },
      ];
    });
};

export const filterQuestion3 = (arr: IProduct[]) => {
  return arr
    .filter((product) => product.category === "moisturizer" && product.spf)
    .map((product) => {
      return [
        {
          action: "remove",
          product,
        },
      ];
    });
};

export const filterQuestion4 = (arr: IProduct[], productTexture: string) => {
  return arr
    .filter(
      (product) =>
        product.category === "makeup_remover" &&
        product.texture === productTexture
    )
    .map((product) => {
      return [
        {
          action: "remove",
          product,
        },
      ];
    });
};

export const filterQuestion5A = (arr: IProduct[]) => {
  return arr
    .filter(
      (product) =>
        product.sunscreen_type?.includes("physical") ||
        product.sunscreen_type?.includes("chemical")
    )
    .map((product) => {
      return [
        {
          action: "nothing",
          product,
        },
      ];
    });
};

export const filterQuestion5B = (arr: IProduct[]) => {
  return arr
    .filter(
      (product) =>
        product.sunscreen_type?.length === 1 &&
        product.sunscreen_type?.includes("physical")
    )
    .map((product) => {
      return [
        {
          action: "remove",
          product,
        },
      ];
    });
};

export const filterQuestion6 = (arr: IProduct[]) => {
  return arr
    .filter((product) => product.spf !== undefined && product.spf < 40)
    .map((product) => {
      return [
        {
          action: "remove",
          product,
        },
      ];
    });
};
