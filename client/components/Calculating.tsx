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

interface IProducts {
  name: string;
  description: string;
  img_url: string;
  ingredients: string;
  texture: string;
  price_range: string;
  skin_type: string[];
  has_fragrance: boolean;
  has_alcohol?: boolean;
  is_waterproof?: boolean;
  is_tinted?: boolean;
  removes_makeup?: boolean;
  spf?: number;
  sunscreen_type?: string[];
  category: string;
}

const Calculating = () => {
  const { userChoices } = useContext(UserChoicesContext);
  const [products, setProducts] = useState<Array<IProducts>>([]);
  const [isCalculating, setIsCalculating] = useState(true);
  const [showPreResults, setShowPreResults] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { routineTheme, setRoutineTheme } = useContext(RoutineContext);

  useEffect(() => {
    // console.log("routineTheme", routineTheme);

    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        // console.log("response", response);

        if (response.ok) {
          const data = await response.json();
          // console.log("data", data.data);
          setProducts([...data.data]);

        } else {
          throw new Error(response.statusText);
        }

      } catch (err) {
        console.error(err);
      }
    }

    getProducts()

    setTimeout(() => {
      setIsCalculating(false)
      setShowPreResults(true);
        setTimeout(() => {
          setShowPreResults(false);
          setShowResults(true); 
        }, 4000);
    }, 5000)


  }, []);

  // if (products.length !== 0) {
  //   console.log('products',products);
  // }

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
