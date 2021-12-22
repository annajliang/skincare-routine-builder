import React, { useState } from "react";
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


function MyApp({ Component, pageProps }: AppProps) {
  const [userChoices, setUserChoices] = useState<Array<IUserChoices>>([]);

  return (
    <>
      <Normalize />
      <Global />
      <Layout>
        <UserChoicesContext.Provider
          value={{
            userChoices,
            setUserChoices,
          }}
        >
          <Component {...pageProps} />
        </UserChoicesContext.Provider>
      </Layout>
    </>
  );
}

export default MyApp;
