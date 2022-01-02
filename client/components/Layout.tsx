import { useRouter } from "next/router"
import { RoutineContext } from "../../pages/_app";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledMain = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
    // const [routineTheme, setRoutineTheme] = useState(true);
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
      // <RoutineContext.Provider value={{ routineTheme, setRoutineTheme }}>
        <StyledOuterContainer>
          {bgToShow()}
          <StyledContainer>
            <StyledMain>{children}</StyledMain>
          </StyledContainer>
        </StyledOuterContainer>
      // </RoutineContext.Provider>
    );
}

export default Layout;