import {
  IProduct,
  RoutineContext,
} from "../../pages/_app";
import ProductCard from "./ProductCard";
import { MorningRoutineContext, NightRoutineContext } from "./Calculating";
import { useContext } from "react";

const Routine = () => {
  const { morningRoutine } = useContext(MorningRoutineContext);
  const { nightRoutine } = useContext(NightRoutineContext);
  const { routineTheme } = useContext(RoutineContext);

  return (
    <>
      {routineTheme === "morning" &&
        morningRoutine.length !== 0 &&
        morningRoutine.map((recommendedProduct: IProduct, i: number) => {
          return (
            <ProductCard
              recommendedProduct={recommendedProduct}
              key={i}
              numOfProducts={morningRoutine.length}
              index={i}
            />
          );
        })}

      {routineTheme === "night" &&
        nightRoutine.length !== 0 &&
        nightRoutine.map((recommendedProduct: IProduct, i: number) => {
          return (
            <ProductCard
              recommendedProduct={recommendedProduct}
              key={i}
              numOfProducts={nightRoutine.length}
              index={i}
            />
          );
        })}
    </>
  );
};

export default Routine;
