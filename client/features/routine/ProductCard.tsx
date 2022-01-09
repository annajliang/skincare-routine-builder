import styled from "styled-components";
import Image from "next/image";
import { useState, useContext, useRef, useEffect } from "react";
import { COLORS } from "../../constants/colors";
import { IProduct, RoutineContext } from "../../../pages/_app";
import Link from "next/link";

const StyledGridItem = styled.div`
  background: ${COLORS.white};
  font-size: 2rem;
  color: ${COLORS.oldCopper};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
  flex: 1;
  height: 100%;
  position: relative;
`;

const StyledProductName = styled.p`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.6rem;
  text-overflow: ellipsis;
`;

const StyledImgContainer = styled.div`
  background: ${COLORS.seashell};
  height: 16rem;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledOuterImgContainer = styled.div`
  background: ${COLORS.seashell};
  height: 18rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledBuyNow = styled.a`
  background-color: ${({ theme }) => theme.buyNowBgColor};
  width: 100%;
  padding: 1rem 0;
  color: ${COLORS.white};
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-align: center;

  :hover {
    background-color: ${({ theme }) => theme.buyNowHoverColor};
    color: ${COLORS.white};
  }
`;

const StyledStep = styled.p<{ routineTheme: string }>`
  text-align: center;
  font-size: 1.6rem;
  /* margin-bottom: 0.5rem; */
  color: ${({ routineTheme }) =>
    routineTheme === "morning" ? "#6F4938" : "#fff"};
  letter-spacing: 0.5px;
  margin-top: 2rem;
`;

const StyledContainer = styled.div<{ numOfProducts: number }>`
  display: flex;
  flex-direction: column;
  /* box-shadow: 4px 4px 8px rgba(49, 48, 44, 0.25); */
  width: ${({ numOfProducts }) => `calc((100% / ${numOfProducts}) - 20px)`};
  margin: 0 10px;

  @media (max-width: 1200px) {
    width: ${({ numOfProducts }) =>
      numOfProducts % 2 === 0
        ? "calc((100% / 2) - 20px)"
        : "calc((100% / 3) - 20px)"};
  }

  @media (max-width: 863px) {
    width: ${({ numOfProducts }) =>
      numOfProducts % 2 !== 0 && "calc((100% / 2) - 20px)"};
  }

  @media (max-width: 701px) {
    width: 100%;
  }
`;

const ProductCard: React.FC<{
  recommendedProduct: IProduct;
  numOfProducts: number;
  index: number
}> = ({ recommendedProduct, numOfProducts, index }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const imageContainer = useRef<HTMLInputElement | null>(null);
  const { routineTheme } = useContext(RoutineContext);


  useEffect(() => {
    if (imageContainer.current?.lastChild) {
      setIsLoadingImage(false);
    }
  }, []);

  return (
    <StyledContainer numOfProducts={numOfProducts}>
      <StyledStep routineTheme={routineTheme}>
        Step {index + 1}. {recommendedProduct.routine_step}
      </StyledStep>

      <StyledGridItem>
        <StyledOuterImgContainer>
          <StyledImgContainer ref={imageContainer}>
            {isLoadingImage ? (
              <Image
                src="/spinner.gif"
                alt=""
                height={100}
                width={100}
                priority
              />
            ) : (
              <Image
                src={recommendedProduct.img_url}
                alt=""
                layout="fill"
                objectFit="contain"
                priority
              />
            )}
          </StyledImgContainer>
        </StyledOuterImgContainer>
        <StyledProductName>
          {recommendedProduct.name.length >= 43
            ? `${recommendedProduct.name.substring(0, 43)}...`
            : recommendedProduct.name}
        </StyledProductName>
      </StyledGridItem>

      <Link href={recommendedProduct.buy_link} passHref>
        <StyledBuyNow target="_blank">BUY NOW</StyledBuyNow>
      </Link>
    </StyledContainer>
  );
};

export default ProductCard;
