import Link from "next/link";
import questions from "../data/questions";
import {
  IUserChoice,
  UserChoicesContext,
} from "../../pages/_app";
import { useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledGridItem = styled.a`
  background: #ffffff;
  opacity: 0.9;
  border-radius: 10px;
  font-size: 2rem;
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
  optionId: number
}> = ({ children, index, question, optionId }) => {
  const { userChoices, setUserChoices } = useContext(UserChoicesContext);
  const route = useRouter();

  const updateUserChoices: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (e) => {
    const userChoicesCopy: IUserChoice[] = [...userChoices];

    userChoicesCopy[index] = {
      id: (index + 1).toString(),
      question,
      answer: optionId,
    };

    setUserChoices(userChoicesCopy);
  };

  return (
    <>
      {route.asPath === `/question/${questions.length}` ? (
        <Link href={"/result"} passHref>
          <StyledGridItem
            data-option={children}
            onClick={(e) => updateUserChoices(e)}
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
            data-option-id={optionId}
            onClick={(e) => updateUserChoices(e)}
          >
            {children}
          </StyledGridItem>
        </Link>
      )}
    </>
  );
};

export default Option;
