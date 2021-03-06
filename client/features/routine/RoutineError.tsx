import { RoutineContext } from "../../../pages/_app";
import { MorningRoutineContext, NightRoutineContext } from "../calculateRoutine/Calculating";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";

const StyledError = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.errorTextColor};
  margin-top: 2rem;

  @media (max-width: 701px) {
    text-align: center;
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.errorTextColor};
  border-bottom: 2px solid ${({ theme }) => theme.errorTextColor};

  :hover {
    border-bottom: 2px solid ${({ theme }) => theme.headingColor};
  }
`;

const StyledNoWrap = styled.span`
  white-space: nowrap;
`;

const RoutineError: React.FC = () => {
  const { morningRoutine } = useContext(MorningRoutineContext);
  const { nightRoutine } = useContext(NightRoutineContext);
  const { routineTheme } = useContext(RoutineContext);

  return (
    <>
      {!morningRoutine.length && !nightRoutine.length && (
        <StyledError>
          Please{" "}
          <Link href="/" passHref>
            <StyledLink>take the quiz</StyledLink>
          </Link>{" "}
          first in order to see your {routineTheme}{" "}
          <StyledNoWrap>routine results. 😊</StyledNoWrap>
        </StyledError>
      )}
    </>
  );
};

export default RoutineError;
