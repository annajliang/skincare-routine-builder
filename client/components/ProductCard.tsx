import styled from "styled-components";
import {
  IProduct,
  RecommendedContext,
  UserChoicesContext,
} from "../../pages/_app";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";

const StyledGridItem = styled.div`
  background: #ffffff;
  font-size: 2rem;
  color: #6f4938;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    text-overflow: ellipsis;
  }
`;

const StyledInnerGridItem = styled.div`
  background: #f2f0ed;
  width: 100%;
  height: 60%;
  padding: 1rem 0;

  img {
    height: 100%;
  }
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

const ProductCard = () => {
  const { recommendedProducts } = useContext(RecommendedContext);
  const { userChoices } = useContext(UserChoicesContext);
  const [morningRoutine, setMorningRoutine] = useState<Array<IProduct>>([]);
  const [nightRoutine, setNightRoutine] = useState<Array<IProduct>>([]);

  useEffect(() => {
    console.log("product card", recommendedProducts);
    console.log("userChoices", userChoices);

    const morningRoutineCopy: IProduct[] = [];

    const findProduct = (productType: string, arr: IProduct[]) => {
      const filteredProducts = recommendedProducts.filter(
        (recommendedProduct) => recommendedProduct.category === productType
      );

      console.log(`FILTERED PRODUCTS - ${productType}`, filteredProducts);

      // if there are more than 1 found product, pick a random one
      if (filteredProducts.length > 1) {
        const index = Math.floor(Math.random() * filteredProducts.length);
        console.log("PRODUCT - IF", filteredProducts[index]);
        arr.push(filteredProducts[index]);
        console.log("morningRoutineCopy - IF", arr);
        console.log("---------");
        // add the single product to state
      } else {
        console.log("PRODUCT - ELSE", filteredProducts);
        arr.push(...filteredProducts);
        console.log("morningRoutineCopy - IF", arr);
      }
    };

    if ( morningRoutine.length === 0) {

        findProduct("moisturizer", morningRoutineCopy);
        findProduct("cleanser", morningRoutineCopy);
        findProduct("sunscreen", morningRoutineCopy);
        console.log("morningRoutine", morningRoutine);
        
            setMorningRoutine(morningRoutineCopy);
    }
  }, [morningRoutine, recommendedProducts, userChoices]);

  return (
    <>
      {morningRoutine.length !== 0 ? (
        morningRoutine.map((recommendedProduct: IProduct, i: number) => {
          return (
            <StyledGridItem key={i}>
              <StyledInnerGridItem>
                {/* test */}
                <img src={recommendedProduct.img_url} />
              </StyledInnerGridItem>
              <p>{recommendedProduct.name}</p>
              <Link href="http://google.com" passHref>
                <StyledBottomGridBar target="_blank">
                  BUY NOW
                </StyledBottomGridBar>
              </Link>
            </StyledGridItem>
          );
        })
      ) : (
        <div>NOT WORKING</div>
      )}
    </>
  );
};

export default ProductCard;
