import { useContext, useState } from "react";
import { morningTheme, nightTheme } from "../../styles/Theme";
import { COLORS } from "../../constants/colors";
import { RoutineContext, Theme } from "../../../pages/_app";
import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  top: 3rem;
  z-index: 3;
  display: flex;
  align-items: center;

  label {
    padding: 0 1rem;
  }
`;

const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  :checked ~ .toggle-slot {
    background-color: ${COLORS.brightGrey};
  }

  :checked ~ .toggle-slot .sun-icon-wrapper {
    opacity: 0;
    transform: translate(2em, 0);
  }

  :checked ~ .toggle-slot .moon-icon-wrapper {
    opacity: 1;
    transform: translate(2em, 0);
  }

  :checked ~ .toggle-slot .toggle-button {
    background-color: ${COLORS.riverBed};
    box-shadow: inset 0px 0px 0px 4px ${COLORS.white};
    transform: translate(1em, 0);
  }
`;

const StyledSlot = styled.div`
  position: relative;
  height: 5rem;
  width: 10rem;
  border: 1px solid ${COLORS.mercury};
  border-radius: 10em;
  background-color: ${COLORS.white};
  /* box-shadow: 0px 10px 25px #e4e7ec; */
  transition: background-color 250ms;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.div`
  transform: translate(6em, 0);
  position: absolute;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: #ffeccf;
  box-shadow: inset 0px 0px 0px 4px ${COLORS.saffronMango};
  transition: background-color 250ms, border-color 250ms,
    transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
`;

const StyledSunWrapper = styled.div`
  height: 5rem;
  opacity: 1;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
`;

const StyledMoonWrapper = styled.div`
  height: 5rem;
  opacity: 0;
  transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
  display: flex;
  align-items: center;
`;

const StyledSunIcon = styled.img`
  height: 30px;
  width: 30px;
`;

const StyledMoonIcon = styled.img`
  height: 27px;
  width: 27px;
`;

const StyledMorningText = styled.p<{ routineTheme: string }>`
  ${({ routineTheme }) =>
    routineTheme === "morning"
      ? `
      font-weight: bold;`
      : `
      opacity: 0.6;
      color: ${COLORS.white};
  `};
`;

const StyledNightText = styled.p<{ routineTheme: string }>`
  ${({ routineTheme }) =>
    routineTheme === "night"
      ? `
      font-weight: bold;
      color: ${COLORS.white};`
      : `
     opacity: 0.6;
  `};
`;

const ThemeToggle: React.FC = () => {
  const { routineTheme, setRoutineTheme } = useContext(RoutineContext);
  
  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if the routineTheme is not light, then set it to dark
    if (routineTheme === "morning") {
      setRoutineTheme("night");
    } else {
      setRoutineTheme("morning");
    }
  };

  return (
    <StyledContainer>
      <StyledMorningText routineTheme={routineTheme}>Morning</StyledMorningText>
      <label htmlFor="toggleTheme">
        <StyledCheckbox
          onChange={toggleTheme}
          className="toggle-checkbox"
          type="checkbox"
          id="toggleTheme"
          name="toggleTheme"
          checked={routineTheme === "night"}
        />
        <StyledSlot className="toggle-slot">
          <StyledSunWrapper className="sun-icon-wrapper">
            <StyledSunIcon
              className="iconify sun-icon"
              data-icon="feather-sun"
              data-inline="false"
              src="/light.svg"
              alt=""
            />
          </StyledSunWrapper>
          <StyledButton className="toggle-button"></StyledButton>
          <StyledMoonWrapper className="moon-icon-wrapper">
            <StyledMoonIcon
              className="iconify moon-icon"
              data-icon="feather-moon"
              data-inline="false"
              src="/dark.svg"
              alt=""
            />
          </StyledMoonWrapper>
        </StyledSlot>
      </label>
      <StyledNightText routineTheme={routineTheme}>Night</StyledNightText>
    </StyledContainer>
  );
};

export default ThemeToggle;
