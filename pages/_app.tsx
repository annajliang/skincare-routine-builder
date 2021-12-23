import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Global from "../client/styles/Global";
import Normalize from "../client/styles/Normalize";
import Layout from "../client/components/Layout";
import type { AppProps } from "next/app";

export interface IUserChoices {
  id: string;
  question: string;
  answer: string | undefined;
}

interface IUserChoicesContext {
  userChoices: IUserChoices;
  setUserChoices: (arr: IUserChoices[]) => void;
}

export const UserChoicesContext = React.createContext<IUserChoicesContext>({
  userChoices: {
    id: "",
    question: "",
    answer: "",
  },
  setUserChoices: function (arr: IUserChoices[]) {},
});

interface IRoutineContext {
  showMorning: boolean;
  setShowMorning: (bool: boolean) => void;
}

export const RoutineContext = React.createContext<IRoutineContext>({
  showMorning: true,
  setShowMorning: function (bool: boolean) {},
});


const Theme = styled.body<{ showMorning: boolean }>`
  /* background: #ffc5c3; */
  background: ${({ showMorning }) => (showMorning ? "#ffc5c3" : "#302D52")};
`;


function MyApp({ Component, pageProps }: AppProps) {
  const [showMorning, setShowMorning] = useState<boolean>(true);
  const [userChoices, setUserChoices] = useState<Array<IUserChoices>>([]);

              console.log("app - showMorning", showMorning);
  return (
    <>
      <Theme showMorning={showMorning}>
        <Normalize />
        <Global />
        <RoutineContext.Provider value={{ showMorning, setShowMorning }}>
          <UserChoicesContext.Provider
            value={{
              userChoices,
              setUserChoices,
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserChoicesContext.Provider>
        </RoutineContext.Provider>
      </Theme>
    </>
  );
}

export default MyApp;
