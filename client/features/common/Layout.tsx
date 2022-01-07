import { useRouter } from "next/router";
import { RoutineContext } from "../../../pages/_app";
import { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledMain = styled.main<{
  isQuizPage: boolean;
  isResultPage: boolean;
  isHomePage: boolean;
}>`
  min-height: 100vh;
  padding: ${({ isResultPage }) => (isResultPage ? "0" : "4rem 0")};
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

  @media (max-width: 1200px) {
    padding: ${({ isResultPage }) => isResultPage && "6rem 0"};
  }

  @media (max-width: 852px) {
    padding: ${({ isHomePage }) => isHomePage && "2.5rem 0"};
    justify-content: flex-start;
  }
`;

const StyledContainer = styled.div`
  padding: 0 2rem;
  z-index: 100;
  position: relative;
`;

const StyledOuterContainer = styled.div`
  position: relative;
  transition: all 0.6s ease;

  .morningTabBg,
  .morningPatternBg,
  .morningMobileBg,
  .nightTabBg,
  .nightPatternBg,
  .nightMobileBg {
    display: none !important;
  }

  @media (max-width: 1000px) {
    .morningTabBg,
    .nightTabBg {
      display: block !important;
    }

    .morningDesktopBg,
    .nightDesktopBg {
      display: none !important;
    }
  }

  @media (max-width: 852px) {
    .morningTabBg,
    .nightTabBg {
      display: none !important;
    }

    .morningMobileBg,
    .morningPatternBg,
    .nightMobileBg,
    .nightPatternBg {
      display: block !important;
    }
  }

  @media (max-width: 500px) {
    .morningMobileBg,
    .morningPatternBg,
    .nightMobileBg,
    .nightPatternBg {
      display: none !important;
    }

    .morningMobileBg,
    .morningPatternBg,
    .nightMobileBg,
    .nightPatternBg {
      display: block !important;
    }
  }
`;

const Layout: React.FC = ({ children }) => {
  const { routineTheme } = useContext(RoutineContext);
  const router = useRouter();

  const bgToShow = () => {
    const imageNameSuffixes = ["DesktopBg", "TabBg", "PatternBg", "MobileBg"];

    if (router.asPath === "/" && routineTheme === "morning") {
      return imageNameSuffixes.map((imageNameSuffix) => {
        return (
          <>
            <Image
              src={`/${routineTheme}${imageNameSuffix}.svg`}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="bottom"
              className={`${routineTheme}${imageNameSuffix}`}
              priority
            />
          </>
        );
      });
    } else if (router.asPath === "/" && routineTheme === "night") {
      return imageNameSuffixes.map((imageNameSuffix) => {
        return (
          <>
            <Image
              src={`/${routineTheme}${imageNameSuffix}.svg`}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="bottom"
              className={`${routineTheme}${imageNameSuffix}`}
              priority
            />
          </>
        );
      });
    } else if (router.asPath !== "/" && routineTheme === "morning") {
      return (
        <Image
          src="/morningPatternBg.svg"
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
          src="/nightPatternBg.svg"
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
        <StyledMain
          isHomePage={router.asPath === "/"}
          isQuizPage={router.asPath.includes("/question")}
          isResultPage={router.asPath === "/result"}
        >
          {children}
        </StyledMain>
      </StyledContainer>
    </StyledOuterContainer>
  );
};

export default Layout;
