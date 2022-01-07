import { useContext } from "react";
import RetakeQuizLink from "./RetakeQuizLink";
import NewRoutineBtn from "./NewRoutineBtn";
import { RoutineContext } from "../../../pages/_app";
import {
  MorningRoutineContext,
  NightRoutineContext,
} from "../calculateRoutine/Calculating";
import Routine from "./Routine";
import styled from "styled-components";
import { StyledAnimated } from "../question/Question";

const StyledRountineContainer = styled.div`
  padding: 0 7rem;
  width: 100%;
  position: relative;
  top: -3rem;

  @media (max-width: 863px) {
    top: 0;
  }

  @media (max-width: 701px) {
    padding: 0 3rem;
  }

  @media (max-width: 621px) {
    padding: 0;
  }
`;
 
const StyledH1 = styled.h1`
  display: block;
  margin: 0;

  @media (max-width: 863px) {
    font-size: 6rem;
  }

  @media (max-width: 701px) {
    text-align: center;
    display: flex;
  }
`;

const StyledH1Container = styled.div`
  position: relative;

  @media (max-width: 701px) {
    text-align: center;
  }
`;

const StyledSun = styled.img`
  position: relative;
  left: 10rem;
  bottom: -4rem;

  @media (max-width: 701px) {
    left: 10px;
  }
`;

const StyledMoon = styled.img`
  position: relative;
  left: 0;
  bottom: -6.5rem;
  height: 14rem;

  @media (max-width: 863px) {
    bottom: -5.5rem;
  }
`;

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  /* @media (max-width: 1200px) {
    justify-content: center;
  } */
`;
  
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`
const StyleBtnContainer = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const RoutineContainer: React.FC<{ routineType: string }> = ({
  routineType,
}) => {
  const { routineTheme } = useContext(RoutineContext);
  const { morningRoutine } = useContext(MorningRoutineContext);
  const { nightRoutine } = useContext(NightRoutineContext);

  return (
    <StyledContainer>
      <StyledRountineContainer>
        <StyledAnimated>
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

          {morningRoutine.length !== 0 && nightRoutine.length !== 0 && (
            <StyleBtnContainer>
              <NewRoutineBtn />
              <RetakeQuizLink />
            </StyleBtnContainer>
          )}
        </StyledAnimated>
      </StyledRountineContainer>
    </StyledContainer>
  );
};

export default RoutineContainer;
