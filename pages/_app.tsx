import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { morningTheme, nightTheme } from "../client/styles/Theme";
import Global from "../client/styles/Global";
import Normalize from "../client/styles/Normalize";
import Layout from "../client/components/Layout";
import type { AppProps } from "next/app";

export interface IUserChoice {
  id: string;
  question: string;
  answer: string | undefined;
}

interface IUserChoiceContext {
  userChoices: IUserChoice[];
  setUserChoices: (arr: IUserChoice[]) => void;
}

export const UserChoicesContext = React.createContext<IUserChoiceContext>({
  userChoices: {
    id: "",
    question: "",
    answer: "",
  },
  setUserChoices: function (arr: IUserChoice[]) {},
});

export interface IProduct {
  name: string;
  description: string;
  img_url: string;
  ingredients: string;
  texture: string;
  price_range: string;
  skin_type: string[];
  has_fragrance: boolean;
  has_alcohol?: boolean;
  is_waterproof?: boolean;
  is_tinted?: boolean;
  removes_makeup?: boolean;
  spf?: number;
  sunscreen_type?: string[];
  category: string;
  is_clean: boolean;
  buy_link: string
}

interface IProductContext {
  recommendedProducts: IProduct[];
  setRecommendedProducts: (arr: IProduct[]) => void;
}

export const RecommendedContext = React.createContext<IProductContext>({
  recommendedProducts: {
    name: "",
    description: "",
    img_url: "",
    ingredients: "",
    texture: "",
    price_range: "",
    skin_type: [],
    has_fragrance: false,
    has_alcohol: false,
    is_waterproof: false,
    is_tinted: false,
    removes_makeup: false,
    spf: 0,
    sunscreen_type: [],
    category: "",
    is_clean: false,
    buy_link: ""
  },
  setRecommendedProducts: function (arr: IProduct[]) {},
});

export type Theme = "morning" | "night"

interface IRoutineContext {
  routineTheme: Theme;
  setRoutineTheme: (theme: Theme) => void;
}

export const RoutineContext = React.createContext<IRoutineContext>({
  routineTheme: "morning",
  setRoutineTheme: function (str: string) {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [routineTheme, setRoutineTheme] = useState<Theme>('morning');
  const [userChoices, setUserChoices] = useState<Array<IUserChoice>>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Array<IProduct>>([]);

  // console.log("app - theme", routineTheme);

  return (
    <ThemeProvider
      theme={routineTheme === "morning" ? morningTheme : nightTheme}
    >
      <Normalize />
      <Global />
      <RoutineContext.Provider value={{ routineTheme, setRoutineTheme }}>
        <RecommendedContext.Provider value={{ recommendedProducts, setRecommendedProducts }}>
          <UserChoicesContext.Provider value={{ userChoices, setUserChoices }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserChoicesContext.Provider>
        </RecommendedContext.Provider>
      </RoutineContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
