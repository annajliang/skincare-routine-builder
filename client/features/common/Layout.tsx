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

  //https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
    @media only screen and (min-device-width: 320px) and
    (max-device-width: 852px) and (-webkit-min-device-pixel-ratio: 2) and
    (orientation: landscape) {
    .morningTabBg,
    .nightTabBg,
    .morningMobileBg,
    .nightMobileBg {
      display: none !important;
    }

    .morningPatternBg,
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

    if (router.asPath === "/") {
      return imageNameSuffixes.map((imageNameSuffix, i) => {
        return (
          <div key={i}>
            <Image
              src={`/${routineTheme}${imageNameSuffix}.svg`}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="bottom"
              className={`${routineTheme}${imageNameSuffix}`}
              priority
            />
          </div>
        );
      });
    } else {
      return (
        <Image
          src={`/${routineTheme}PatternBg.svg`}
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
