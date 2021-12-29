import styled from "styled-components";
import { IProduct } from "../../pages/_app";
import Link from "next/link";

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

const ProductCard: React.FC<{ recommendedProduct: IProduct }> = ({
  recommendedProduct,
}) => {
  return (
    <StyledGridItem>
      <StyledInnerGridItem>
        {/* test */}
        <img src={recommendedProduct.img_url} />
      </StyledInnerGridItem>
      <p>{recommendedProduct.name}</p>
      <Link href={recommendedProduct.buy_link} passHref>
        <StyledBottomGridBar target="_blank">BUY NOW</StyledBottomGridBar>
      </Link>
    </StyledGridItem>
  );
};

export default ProductCard;
