import Link from "next/link";
import questions from '../data/questions';
import { IUserChoices } from './Question';
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

const Option: React.FC<{
  children: string;
  index: number;
  userChoices: IUserChoices[];
  setUserChoices: (arr: IUserChoices[]) => void;
  question: string
}> = ({ children, index, userChoices, setUserChoices, question }) => {
    // console.log("userChoices", userChoices);

  const getUserAnswer: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (e) => {
    const selection = {
      id: '' + (index + 1),
      question,
      answer: e.currentTarget.dataset.option,
    };

    const userChoicesCopy = userChoices;

    userChoicesCopy.push({
      id: '' + (index + 1),
      question,
      answer: e.currentTarget.dataset.option,
    });
    
    setUserChoices([...userChoicesCopy]);
  };

  return (
    <Link
      href={
        index < questions.length - 1
          ? `/question/${questions[index + 1].id}`
          : "/"
      }
      passHref
    >
      <StyledGridItem data-option={children} onClick={(e) => getUserAnswer(e)}>
        {children}
      </StyledGridItem>
    </Link>
  );
};

export default Option;
