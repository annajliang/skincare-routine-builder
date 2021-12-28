import { useContext, useState, useEffect } from "react";
import { RoutineContext } from "../../pages/_app";
import Morning from "./Morning";
import Night from "./Night";
import { UserChoicesContext } from "../../pages/_app";
import Image from "next/image";
import { Animated } from "react-animated-css";
import styled from "styled-components";

const StyledCentered = styled.div`
  margin: auto;
  text-align: center;
`;

const Calculating = () => {
  const { userChoices } = useContext(UserChoicesContext);
  const [isCalculating, setIsCalculating] = useState(true);
  const [showPreResults, setShowPreResults] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { routineTheme, setRoutineTheme } = useContext(RoutineContext);

  useEffect(() => {
    setTimeout(() => {
      setIsCalculating(false)
      setShowPreResults(true);
        setTimeout(() => {
          setShowPreResults(false);
          setShowResults(true); 
        }, 100);
    }, 100)


  }, []);

  // console.log("CALC", userChoices);
  
  return (
    <>
      {isCalculating && (
        <StyledCentered>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <h1>
              <span>Calculating</span> <span>routine...</span>
            </h1>
            <Image
              src="/loading.svg"
              alt=""
              width={300}
              height={300}
              priority
            />
          </Animated>
        </StyledCentered>
      )}

      {showPreResults && (
        <StyledCentered>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <h1>
              <span>Your results</span> <span>are in!</span>
            </h1>
            <Image src="/loaded.svg" alt="" width={300} height={300} priority />
          </Animated>
        </StyledCentered>
      )}

      {showResults && !showPreResults && routineTheme === 'morning' && <Morning />}
      {showResults && !showPreResults && routineTheme === 'night' && <Night />}
    </>
  );
};

export default Calculating;
