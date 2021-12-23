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
`

// interface IRoutineContext {
//   showMorning: boolean;
//   setShowMorning: (bool: boolean) => void;
// }

// export const RoutineContext = React.createContext<IRoutineContext>({
//   showMorning: true,
//   setShowMorning: function (bool: boolean) {},
// });

const Layout: React.FC = ({ children }) => {
    // const [showMorning, setShowMorning] = useState(true);
    const { showMorning } = useContext(RoutineContext);
    const router = useRouter();


    const bgToShow = () => {
      if (router.asPath === "/") {
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
      } else if (router.asPath !== "/" && showMorning) {
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
      } else if (router.asPath !== "/" && !showMorning) {
          return <Image
            src="/nightBg.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            priority
          />;   
      }
    };

    return (
      // <RoutineContext.Provider value={{ showMorning, setShowMorning }}>
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