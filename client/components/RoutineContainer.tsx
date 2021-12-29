import { useState, useEffect, useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { RoutineContext } from "../../pages/_app";
import Routine from "./Routine";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import Image from "next/image";

const StyledRountineContainer = styled.div<{ routineTheme: string }>`
  padding: 0 7rem;
  width: 100%;
  position: relative;
  /* top: ${({ routineTheme }) => (routineTheme ? "-4rem" : "-6.5rem")}; */
  top: -4rem;
`;
 
const StyledH1 = styled.h1`
  display: block;
`;

const StyledH1Container = styled.div`
  position: relative;
  margin-bottom: 4rem;
`;

const StyledSun = styled.img`
  position: relative;
  left: 10rem;
  bottom: -4rem;
`;

const StyledMoon = styled.img`
  position: relative;
  left: 0;
  bottom: -6.5rem;
  height: 14rem;
`;

const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 32rem;
`;
  
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`
  


const RoutineContainer: React.FC<{ routineType: string }> = ({
  routineType,
}) => {
  const { routineTheme } = useContext(RoutineContext);

  return (
    <StyledContainer>
      <ThemeToggle />
      <StyledRountineContainer routineTheme={routineTheme}>
        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOutLeft"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={true}
        >
          <StyledH1Container>
            {routineTheme === "morning" ? (
              <StyledSun src="/sun.svg" alt="" />
            ) : (
              <StyledMoon src="/moon.svg" alt="" />
            )}
            <StyledH1>
              <span>{routineType}</span> <span>Routine</span>
            </StyledH1>
          </StyledH1Container>

          <StyledGrid>
            <Routine />
          </StyledGrid>
        </Animated>
      </StyledRountineContainer>
    </StyledContainer>
  );
};

export default RoutineContainer;
