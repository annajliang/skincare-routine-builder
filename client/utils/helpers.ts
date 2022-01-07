import { IProduct } from "../../pages/_app";
import { ICommand } from "../features/calculateRoutine/Calculating";

export const removeProducts = (arr1: ICommand[], arr2: ICommand[]) => {
  return arr1.filter((x) => {
    return arr2.findIndex((t) => t.product.name === x.product.name) === -1;
  });
};

export const filterQuestion1 = (products: IProduct[], skinType: string): ICommand[] => {
  return products
    .filter(
      (product) =>
        product.skin_type?.includes("all") ||
        product.skin_type?.includes(skinType)
    )
    .map((product) => {
      return {
          action: "add",
          product,
        }
    });
};

export const filterQuestion2 = (products: IProduct[], skinConcern: string): ICommand[] => {
  return products
    .filter(
      (product) =>
        product.skin_concerns?.includes(skinConcern) &&
        product.category === "treatment"
    )
    .map((product) => {
      return {
        action: "add",
        product,
      };
    });
};

export const filterQuestion3 = (products: IProduct[]): ICommand[] => {
  return products
    .filter((product) => product.category === "moisturizer" && product.spf)
    .map((product) => {
      return {
        action: "remove",
        product,
      };
    });
};

export const filterQuestion4 = (products: IProduct[], productTexture: string): ICommand[] => {
  return products
    .filter(
      (product) =>
        product.category === "makeup_remover" &&
        product.texture === productTexture
    )
    .map((product) => {
      return {
          action: "remove",
          product,
        }
    });
};

export const filterQuestion5 = (products: IProduct[]): ICommand[] => {
  return products
    .filter(
      (product) =>
        product.sunscreen_type?.length === 1 &&
        product.sunscreen_type?.includes("physical")
    )
    .map((product) => {
      return {
        action: "remove",
        product,
      };
    });
};

export const filterQuestion6 = (products: IProduct[]): ICommand[] => {
  return products
    .filter((product) => product.spf !== undefined && product.spf < 40)
    .map((product) => {
      return {
        action: "remove",
        product,
      };
    });
};
