import React, { useContext } from "react";
import { useCalcProducts } from "./useCalcProducts";
import ThemeToggle from "../routine/ThemeToggle";
import { useRoutines } from "./useRoutines";
import {
  RoutineContext,
  IProduct,
  UserChoicesContext,
  RecommendedContext,
} from "../../../pages/_app";
import Morning from "../routine/Morning";
import Night from "../routine/Night";
import Image from "next/image";
import { fadeIn } from "../../styles/fadeIn";
import styled from "styled-components";

const StyledCentered = styled.div`
  margin: auto;
  text-align: center;

  @media (max-width: 863px) {
    h1 {
      font-size: 6rem;
    }
  }

  @media (max-width: 701px) {
    h1 {
      font-size: 5rem;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 4.4rem;
    }
  }
`;

const StyledAnimated = styled.div`
  animation: ${fadeIn} 1s ease;
  will-change: opacity;
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
  const { routineTheme } = useContext(RoutineContext);
  const { userChoices } = useContext(UserChoicesContext);
      const { recommendedProducts, setRecommendedProducts } =
        useContext(RecommendedContext);

  const {isCalculating, showResults, showPreResults} = useCalcProducts();
  const { morningRoutine, nightRoutine, setMorningRoutine, setNightRoutine } =
    useRoutines(recommendedProducts);

  return (
    <>
      {isCalculating && userChoices.length !== 0 && (
        <StyledCentered>
          <StyledAnimated>
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
          </StyledAnimated>
        </StyledCentered>
      )}

      {showPreResults && userChoices.length !== 0 && (
        <StyledCentered>
          <StyledAnimated>
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
          </StyledAnimated>
        </StyledCentered>
      )}

      <MorningRoutineContext.Provider
        value={{ morningRoutine, setMorningRoutine }}
      >
        {/* <ThemeToggle /> */}
        {showResults && !showPreResults && <ThemeToggle />}
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
