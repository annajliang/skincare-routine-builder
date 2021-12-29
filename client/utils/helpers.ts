import { ICommand } from "../components/Calculating";

export const removeProducts = (arr1: ICommand[], arr2: ICommand[]) => {
  return arr1.filter((x) => {
    return arr2.findIndex((t) => t.product.name === x.product.name) === -1;
  });
};
