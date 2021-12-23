import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { morningTheme, nightTheme } from "../client/styles/Theme";
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
  routineTheme: string;
  setRoutineTheme: (str: string) => void;
}

export const RoutineContext = React.createContext<IRoutineContext>({
  routineTheme: "morniing",
  setRoutineTheme: function (str: string) {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [routineTheme, setRoutineTheme] = useState<string>('morning');
  const [userChoices, setUserChoices] = useState<Array<IUserChoices>>([]);

  console.log("app - theme", routineTheme);

  return (
    <ThemeProvider
      theme={routineTheme === "morning" ? morningTheme : nightTheme}
    >
        <Normalize />
        <Global />
        <RoutineContext.Provider value={{ routineTheme, setRoutineTheme }}>
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
    </ThemeProvider>
  );
}

export default MyApp;
