import React, { useContext } from "react";
import { useCalcProducts } from "./useCalcProducts";
import ThemeToggle from "./ThemeToggle";
import { useRoutines } from "./useRoutines";
import { RoutineContext, IProduct } from "../../pages/_app";
import Morning from "./Morning";
import Night from "./Night";
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
  const { routineTheme } = useContext(RoutineContext);
  const {isCalculating, showResults, showPreResults} = useCalcProducts();
  const {morningRoutine, nightRoutine, setMorningRoutine, setNightRoutine} =
    useRoutines();

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
