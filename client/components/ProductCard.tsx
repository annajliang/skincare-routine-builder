import styled from "styled-components"; 
import { RecommendedContext } from "../../pages/_app";
import Link from "next/link";
import { useContext } from "react";

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

const ProductCard = () => {
    const { recommendedProducts } = useContext(RecommendedContext);
    console.log("product card", recommendedProducts);

    return (
      <StyledGridItem>
        <StyledInnerGridItem>test</StyledInnerGridItem>
        <p>CeraVe Foaming Facial Cleanser</p>
        <Link href="http://google.com" passHref>
          <StyledBottomGridBar target="_blank">BUY NOW</StyledBottomGridBar>
        </Link>
      </StyledGridItem>
    );
}

export default ProductCard