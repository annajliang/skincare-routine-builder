import { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { StyledImage } from "./NewRoutineBtn";
import Image from "next/image";
import { RoutineContext } from "../../../pages/_app";
import { COLORS } from "../../constants/colors";
import styled from "styled-components";

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

  :hover {
    color: ${({ theme }) => theme.retakeQuizHover};
    box-shadow: 0 3px 0 ${({ theme }) => theme.retakeQuizHover};
    border: 1.5px solid ${({ theme }) => theme.retakeQuizHover};
  }
`;

const RetakeQuizLink: React.FC = () => {
  const { routineTheme } = useContext(RoutineContext);
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <Link href="/question/1" passHref>
      <StyledLink onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <StyledImage>
          {isHovering && routineTheme === "morning" && (
            <Image
              src="/morningRedoIconHover.svg"
              height={25}
              width={20}
              priority
              alt=""
            />
          )}

          {isHovering && routineTheme === "night" && (
            <Image
              src="/nightRedoIconHover.svg"
              height={25}
              width={20}
              priority
              alt=""
            />
          )}

          {!isHovering && (
            <Image
              src={
                routineTheme === "morning"
                  ? `/morningRedoIcon.svg`
                  : `/nightRedoIcon.svg`
              }
              height={25}
              width={20}
              priority
              alt=""
            />
          )}
        </StyledImage>
        Retake quiz
      </StyledLink>
    </Link>
  );
};

export default RetakeQuizLink;
