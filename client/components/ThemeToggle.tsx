import { useContext } from "react";
import { morningTheme, nightTheme } from "../../client/styles/Theme";
import { RoutineContext } from "../../pages/_app";
import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  top: 3rem;
  z-index: 3;
`;

const StyledCheckbox = styled.input<{ routineTheme: string }>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  /* ${({ routineTheme }) =>
    !routineTheme &&
    css`
      &:checked ~ .toggle-slot {
        background-color: #374151;
      }

      &:checked ~ .toggle-slot .sun-icon-wrapper {
        opacity: 0;
        transform: translate(2em, 0);
      }

      &:checked ~ .toggle-slot .moon-icon-wrapper {
        opacity: 1;
        transform: translate(2em, 0);
      }

      &:checked ~ .toggle-slot .toggle-button {
        background-color: #485367;
        box-shadow: inset 0px 0px 0px 4px white;
        transform: translate(1em, 0);
      }
    `} */
    
  :checked ~ .toggle-slot {
    background-color: #374151;
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
    background-color: #485367;
    box-shadow: inset 0px 0px 0px 4px white;
    transform: translate(1em, 0);
  }
`;

const StyledSlot = styled.div`
  position: relative;
  height: 5rem;
  width: 10rem;
  border: 1px solid #e4e7ec;
  border-radius: 10em;
  background-color: white;
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
  box-shadow: inset 0px 0px 0px 4px #ffbb52;
  transition: background-color 250ms, border-color 250ms,
  transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
`;
    
const StyledSunWrapper = styled.div`
  /* position: absolute; */
  height: 5rem;
  opacity: 1;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  /* transform-origin: 50% 50%; */
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
    





const ThemeToggle: React.FC = () => {
  const { routineTheme, setRoutineTheme } = useContext(RoutineContext);

  // The function that toggles between themes
  // const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // if the routineTheme is not light, then set it to dark
  //   if (routineTheme === "morning") {
  //     setRoutineTheme("night");
  //     // otherwise, it should be light
  //   } else {
  //     setRoutineTheme("morning");
  //   }
  // };

    const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
      // if the routineTheme is not light, then set it to dark
      if (e.target.checked) {
        setRoutineTheme("night");
        // otherwise, it should be light
      } else {
        setRoutineTheme("morning");
      }
    };

  return (
    <StyledContainer>
      <label htmlFor="toggleTheme">
        <StyledCheckbox
          onChange={toggleTheme}
          className="toggle-checkbox"
          type="checkbox"
          id="toggleTheme"
          name="toggleTheme"
          routineTheme={routineTheme}
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
    </StyledContainer>
  );
}

export default ThemeToggle;