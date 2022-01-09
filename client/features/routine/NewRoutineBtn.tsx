import { useRoutines } from "../calculateRoutine/useRoutines";
import { RecommendedContext } from "../../../pages/_app";
import {
  MorningRoutineContext,
  NightRoutineContext,
} from "../calculateRoutine/Calculating";
import { COLORS } from "../../constants/colors";
import { useContext } from "react";
import Image from "next/image";
import styled from "styled-components";

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

  :hover {
    background-color: ${({ theme }) => theme.secondaryBtnHover};
  }
`;

export const StyledImage = styled.div`
  margin-right: 5px;
`;

const NewRoutineBtn = () => {
  const { recommendedProducts } = useContext(RecommendedContext);
  const { morningRoutine, nightRoutine, setChangeRoutine } =
    useRoutines(recommendedProducts);
  const { setMorningRoutine } = useContext(MorningRoutineContext);
  const { setNightRoutine } = useContext(NightRoutineContext);

  const getNewRoutine = () => {
    setChangeRoutine(true);
    const newMorningRoutine = [...morningRoutine];
    setMorningRoutine(newMorningRoutine);

    const newNightRoutine = [...nightRoutine];
    setNightRoutine(newNightRoutine);
  };

  return (
    <StyledButton onClick={getNewRoutine}>
      <StyledImage>
        <Image
          src="/skincareIcon.svg"
          height={25}
          width={20}
          priority
          alt=""
        />
      </StyledImage>
      Get new routine
    </StyledButton>
  );
};

export default NewRoutineBtn;
