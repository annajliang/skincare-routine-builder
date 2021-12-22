import Link from "next/link";
import questions from '../data/questions';
import { IUserChoices } from "../../pages/_app";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserChoicesContext } from "../../pages/_app";
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
  question: string;
}> = ({ children, index, question }) => {
  // console.log("userChoices", userChoices);
  const { userChoices, setUserChoices } = useContext(UserChoicesContext);
  const route = useRouter();

  const getUserAnswer: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (e) => {
    const selection = {
      id: "" + (index + 1),
      question,
      answer: e.currentTarget.dataset.option,
    };

    const userChoicesCopy: IUserChoices[] = userChoices;

    userChoicesCopy.push({
      id: "" + (index + 1),
      question,
      answer: e.currentTarget.dataset.option,
    });

    setUserChoices([...userChoicesCopy]);
  };

  return (
    <>
      {route.asPath === `/question/10` ? (
        <Link href={"/result"} passHref>
          <StyledGridItem
            data-option={children}
            onClick={(e) => getUserAnswer(e)}
          >
            {children}
          </StyledGridItem>
        </Link>
      ) : (
        <Link
          href={
            index < questions.length - 1
              ? `/question/${questions[index + 1].id}`
              : "/"
          }
          passHref
        >
          <StyledGridItem
            data-option={children}
            onClick={(e) => getUserAnswer(e)}
          >
            {children}
          </StyledGridItem>
        </Link>
      )}
    </>
  );
};

export default Option;
