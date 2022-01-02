import type { NextPage } from "next";
import styled from "styled-components";
import Link from "next/link";

const StyledHome = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
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
          augue ultrices lacus placerat, non tempor eros lacinia. In orci lacus,
          laoreet in fringilla at, ultricies vel lectus. Fusce dapibus urna
          dolor, convallis malesuada mauris pretium in.
        </p>
        <Link href={`/question/1`} passHref>
          <a>Start</a>
        </Link>
      </StyledContent>
    </StyledHome>
  );
};

export default Home;
