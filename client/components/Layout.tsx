import { useRouter } from "next/router"
import { RoutineContext } from "../../pages/_app";
import { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledMain = styled.main<{ isQuizPage: boolean; isResultPage: boolean }>`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ isResultPage }) =>
    isResultPage ? "flex-end" : "flex-start"};

  ${({ isQuizPage }) =>
    isQuizPage &&
    `
    @media (max-width: 1000px) {
    display: block;
    padding: 5rem 0 0 0;
  }
  `}
`;

const StyledContainer = styled.div`
  padding: 0 2rem;
  z-index: 100;
  position: relative;
`;

const StyledOuterContainer = styled.div`
  position: relative;
  transition: all 0.6s ease;
`;

const Layout: React.FC = ({ children }) => {
    const { routineTheme } = useContext(RoutineContext);
    const router = useRouter();


    const bgToShow = () => {
      if (router.asPath === "/" && routineTheme === "morning") {
        return (
          <Image
            src="/homeBg.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            priority
          />
        );
      } else if (router.asPath === "/" && routineTheme === "night") {
        return (
          <Image
            src="/nightHomeBg.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            priority
          />
        );        
      } else if (router.asPath !== "/" && routineTheme === "morning") {
        return (
          <Image
            src="/quizBg.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            priority
          />
        );
      } else if (router.asPath !== "/" && routineTheme === "night") {
        return (
          <Image
            src="/nightBg.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            priority
          />
        );
      }
    };

    return (
      <StyledOuterContainer>
        {bgToShow()}
        <StyledContainer>
          <StyledMain isQuizPage={router.asPath.includes('/question')} isResultPage={router.asPath === '/result'}>{children}</StyledMain>
        </StyledContainer>
      </StyledOuterContainer>
    );
}

export default Layout;