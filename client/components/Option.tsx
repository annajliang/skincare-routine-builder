import Link from "next/link";
import questions from '../data/questions';
import styled from "styled-components";

const StyledGridItem = styled.a`
  background: #ffffff;
  opacity: 0.9;
  border-radius: 10px;
  font-size: 2rem;
  color: #6f4938;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  flex: 1;
  height: 100%;

  :not(:last-child) {
    margin-right: 2rem;
  }
`;

const Option: React.FC<{ children: string, index: number }> = ({ children, index }) => {
  return (
    <Link
      href={
        index < questions.length - 1
          ? `/question/${questions[index + 1].id}`
          : "/"
      }
      passHref
    >
      <StyledGridItem>{children}</StyledGridItem>
    </Link>
  );
};

export default Option;
