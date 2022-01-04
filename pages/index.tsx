import type { NextPage } from "next";
import styled from "styled-components";
import Link from "next/link";

const StyledHome = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;

  @media (max-width: 852px) {
    width: 100%;
  }
`;

const StyledContent = styled.div`
  text-align: center;
  width: 70%;

  p {
    color: ${({ theme }) => theme.introTextColor};
    margin-bottom: 4rem;
  }

  a {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.textColor};
    text-transform: uppercase;
    background: ${({ theme }) => theme.startBtnColor};
    padding: 1.5rem 4rem;
    letter-spacing: 1px;
    border-radius: 5px;
    font-weight: 700;
    transition: 0.3s;

    :hover {
      color: #fff;
    }
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 5.5rem;
    }

    a {
      display: block;
      width: 100%;
    }

    p {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 852px) {
    width: 90%;
  }

  @media (max-width: 450px) {
    width: 100%;

    h1 {
      font-size: 5rem;
    }

    p {
      font-size: 1.3rem;
    }
  }
`;

const Home: NextPage = () => {
  return (
    <StyledHome>
      <StyledContent>
        <h1>
          <span>Live in Your</span> <span>Best Skin</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          felis neque, euismod at maximus id, pharetra sed justo. Integer
          accumsan lacinia dui, scelerisque aliquet odio placerat ut. Aenean
          augue eros, facilisis et purus vitae, lobortis fermentum odio. Nunc
          accumsan scelerisque turpis, eu luctus massa semper at. In venenatis
          augue ultrices lacus placerat, non tempor eros lacinia. 
        </p>
        <Link href={`/question/1`} passHref>
          <a>Start</a>
        </Link>
      </StyledContent>
    </StyledHome>
  );
};

export default Home;
