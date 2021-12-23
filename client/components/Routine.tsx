import { useState, useEffect, useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { RoutineContext } from "../../pages/_app";
import Link from "next/link";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import Image from "next/image";

const StyledContainer = styled.div<{ routineTheme: string }>`
  padding: 0 7rem;
  width: 100%;
  position: relative;
  /* top: ${({ routineTheme }) => routineTheme ? '-4rem' : '-6.5rem'}; */
  top: -4rem;
`;
 
const StyledH1 = styled.h1`
  display: block;
`;

const StyledH1Container = styled.div`
  position: relative;
  margin-bottom: 4rem;
`;

const StyledSun = styled.img`
  position: relative;
  left: 10rem;
  bottom: -4rem;
`;

const StyledMoon = styled.img`
  position: relative;
  left: 0;
  bottom: -6.5rem;
`;

const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 32rem;
`;

const StyledGridItem = styled.div`
  background: #ffffff;
  font-size: 2rem;
  color: #6f4938;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: center; */
  padding: 1.5rem;
  text-align: center;
  flex: 1;
  height: 100%;
  box-shadow: 4px 4px 8px rgba(49, 48, 44, 0.25);
  position: relative;

  :not(:last-child) {
    margin-right: 5rem;
  }

  p {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const StyledInnerGridItem = styled.div`
  background: #f2f0ed;
  width: 100%;
  height: 60%;
`;

const StyledBottomGridBar = styled.a`
  background-color: ${({ theme }) => theme.buyNowLinkBgColor};
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 1rem 0;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 1px;
`;
  
const Test = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`
  


const Routine: React.FC<{ routineType: string }> = ({ routineType }) => {
  const { routineTheme } = useContext(RoutineContext);

  return (
    <Test>
      <ThemeToggle />
      <StyledContainer routineTheme={routineTheme}>
        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOutLeft"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={true}
        >
          <StyledH1Container>
            {routineTheme === 'morning' ? (
              <StyledSun src="/sun.svg" alt="" />
            ) : (
              <StyledMoon src="/moon.svg" alt="" />
            )}
            <StyledH1>
              <span>{routineType}</span> <span>Routine</span>
            </StyledH1>
          </StyledH1Container>

          <StyledGrid>
            <StyledGridItem>
              <StyledInnerGridItem>test</StyledInnerGridItem>
              <p>CeraVe Foaming Facial Cleanser</p>
              <Link href="http://google.com" passHref>
                <StyledBottomGridBar target="_blank">
                  BUY NOW
                </StyledBottomGridBar>
              </Link>
            </StyledGridItem>

            <StyledGridItem>
              <StyledInnerGridItem>test</StyledInnerGridItem>
              <StyledBottomGridBar>
                BUY NOW
              </StyledBottomGridBar>
            </StyledGridItem>

            <StyledGridItem>
              <StyledInnerGridItem>test</StyledInnerGridItem>
              <StyledBottomGridBar>
                BUY NOW
              </StyledBottomGridBar>
            </StyledGridItem>

            <StyledGridItem>
              <StyledInnerGridItem>test</StyledInnerGridItem>
              <StyledBottomGridBar>
                BUY NOW
              </StyledBottomGridBar>
            </StyledGridItem>
          </StyledGrid>
        </Animated>
      </StyledContainer>
    </Test>
  );
};

export default Routine;
