import styled from "styled-components";
import { useContext } from "react";
import { IProduct, RoutineContext } from "../../pages/_app";
import Link from "next/link";

const StyledGridItem = styled.div`
  background: #ffffff;
  font-size: 2rem;
  color: #6f4938;
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

const StyledInnerGridItem = styled.div`
  background: #f2f0ed;
  width: 100%;
  height: 60%;
  padding: 1rem 0;
  height: 18rem;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const StyledBuyNow = styled.a`
  background-color: ${({ theme }) => theme.buyNowLinkBgColor};
  width: 100%;
  left: 0;
  padding: 1rem 0;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-align: center;

  :hover {
    background-color: ${({ theme }) => theme.buyNowHoverColor};
    color: #fff;
  }
`;

const StyledStep = styled.p<{ routineTheme: string }>`
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: ${({ routineTheme }) =>
    routineTheme === "morning" ? "#6F4938" : "#fff"};
  letter-spacing: 0.5px;
`;

const StyledContainer = styled.div<{ numOfProducts: number }>`
  display: flex;
  flex-direction: column;
  /* box-shadow: 4px 4px 8px rgba(49, 48, 44, 0.25); */
  width: ${({ numOfProducts }) => `calc((100% / ${numOfProducts}) - 20px)`};
  margin: 0 10px;
`;

const ProductCard: React.FC<{
  recommendedProduct: IProduct;
  numOfProducts: number;
  index: number
}> = ({ recommendedProduct, numOfProducts, index }) => {
  const { routineTheme } = useContext(RoutineContext);

  return (
    <StyledContainer numOfProducts={numOfProducts}>
      <StyledStep routineTheme={routineTheme}>
        Step {index + 1}. {recommendedProduct.routine_step}
      </StyledStep>
      <StyledGridItem>
        <StyledInnerGridItem>
          <img src={recommendedProduct.img_url} />
        </StyledInnerGridItem>
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
