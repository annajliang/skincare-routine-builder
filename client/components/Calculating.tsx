import Image from "next/image";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: auto;
  text-align: center;
`;

const Calculating = () => {
  return (
    <StyledContainer>
      <h1>
        <span>Calculating</span> <span>routine...</span>
      </h1>
      <Image src="/loading.gif" alt="" width={200} height={200} priority />
    </StyledContainer>
  );
};

export default Calculating;
