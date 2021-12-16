import { useRouter } from "next/router"
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


const Layout: React.FC = ({ children }) => {
    const router = useRouter();
    return (
      <>
        {router.asPath === "/" ? (
          <Image
            src="/homeBg.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            priority
          />
        ) : (
          <Image
            src="/quizBg.svg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            priority
          />
        )}
        <StyledContainer>
          <StyledMain>{children}</StyledMain>
        </StyledContainer>
      </>
    );
}

export default Layout;