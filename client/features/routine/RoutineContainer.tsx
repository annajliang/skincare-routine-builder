import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoutineContext } from "../../../pages/_app";
import { COLORS } from "../../constants/colors";
import { useRoutines } from "../calculateRoutine/useRoutines";
import { RecommendedContext } from "../../../pages/_app";
import {
  MorningRoutineContext,
  NightRoutineContext,
} from "../calculateRoutine/Calculating";
import Routine from "./Routine";
import styled from "styled-components";
import { Animated } from "react-animated-css";

const StyledRountineContainer = styled.div`
  padding: 0 7rem;
  width: 100%;
  position: relative;
  top: -4rem;

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
  /* margin-bottom: 4rem; */

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
  
const StyledButton = styled.button`
  z-index: 3;
  position: relative;
  background-color: ${({ theme }) => theme.secondaryBtn};
  border: none;
  color: ${({ theme }) => theme.secondaryBtnText};
  font-size: 1.6rem;
  font-family: inherit;
  padding: 1rem 2rem;
  border-radius: 5px;
  box-shadow: 0 3px 1px ${({ theme }) => theme.secondaryBtnShadow};
  border: 1.5px solid ${({ theme }) => theme.secondaryBtnShadow};
  letter-spacing: 0.5px;
  font-weight: 700;

  display: inline-flex;
  align-items: center;

  :first-child {
    margin-right: 2rem;
  }
`;

const StyledLink = styled.a`
  z-index: 3;
  position: relative;
  background-color: ${COLORS.white};
  border: none;
  color: ${({ theme }) => theme.retakeQuizBtn};
  font-size: 1.6rem;
  font-family: inherit;
  padding: 1rem 2rem;
  border-radius: 5px;
  box-shadow: 0 3px 0 ${({ theme }) => theme.retakeQuizBtn};
  border: 1.5px solid ${({ theme }) => theme.retakeQuizBtn};
  letter-spacing: 0.5px;
  font-weight: 700;

  display: inline-flex;
  align-items: center;
`;

const StyledImage = styled.div`
  margin-right: 5px;
`;

const StyleBtnContainer = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const RoutineContainer: React.FC<{ routineType: string }> = ({
  routineType,
}) => {
  const { routineTheme } = useContext(RoutineContext);
  const { recommendedProducts } = useContext(RecommendedContext);
  const { morningRoutine, nightRoutine, setChangeRoutine } =
    useRoutines(recommendedProducts);
  const { setMorningRoutine } = useContext(MorningRoutineContext);
  const { setNightRoutine } = useContext(NightRoutineContext);

      const getNewRoutine = () => {
        setChangeRoutine(true);
        console.log("morningRoutine", morningRoutine);
        const newMorningRoutine = [...morningRoutine];
        setMorningRoutine(newMorningRoutine);

        const newNightRoutine = [...nightRoutine];
        setNightRoutine(newNightRoutine);
      }

  return (
    <StyledContainer>
      <StyledRountineContainer>
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

          <StyleBtnContainer>
            <StyledButton onClick={getNewRoutine}>
              <StyledImage>
                <Image src="/skincareIcon.svg" height={25} width={20} alt="" />
              </StyledImage>
              Get new routine
            </StyledButton>
            <Link href="/question/1" passHref>
              <StyledLink>
                <StyledImage>
                  <Image
                    src={
                      routineTheme === "morning"
                        ? `/morningRedoIcon.svg`
                        : `/nightRedoIcon.svg`
                    }
                    height={25}
                    width={20}
                    alt=""
                  />
                </StyledImage>
                Retake quiz
              </StyledLink>
            </Link>
          </StyleBtnContainer>
        </Animated>
      </StyledRountineContainer>
    </StyledContainer>
  );
};

export default RoutineContainer;
