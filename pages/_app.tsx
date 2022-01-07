import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { morningTheme, nightTheme } from "../client/styles/Theme";
import Normalize from "../client/styles/Normalize";
import Global from "../client/styles/Global";
import Animations from "../client/styles/Animations";
import Layout from "../client/features/common/Layout";
import type { AppProps } from "next/app";

export interface IUserChoice {
  id: string;
  question: string;
  answer: number;
}

interface IUserChoiceContext {
  userChoices: IUserChoice[];
  setUserChoices: (arr: IUserChoice[]) => void;
}

export const UserChoicesContext = React.createContext<IUserChoiceContext>({
  userChoices: [],
  setUserChoices: function (arr: IUserChoice[]) {},
});

export interface IProduct {
  name: string;
  description: string;
  img_url: string;
  ingredients: string;
  texture: string;
  price_range: string;
  skin_type?: string[];
  has_fragrance: boolean;
  has_alcohol?: boolean;
  is_waterproof?: boolean;
  spf?: number;
  sunscreen_type?: string[];
  category: string;
  is_clean: boolean;
  routine_step: string;
  skin_concerns?: string[];
  buy_link: string;
}

interface IProductContext {
  recommendedProducts: IProduct[];
  setRecommendedProducts: (arr: IProduct[]) => void;
}

export const RecommendedContext = React.createContext<IProductContext>({
  recommendedProducts: [],
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


interface IRecommendedContext {
  products: IProduct[];
  setProducts: (arr: IProduct[]) => void;
}

export const ProductContext = React.createContext<IRecommendedContext>({
  products: [],
  setProducts: function (arr: IProduct[]) {},
});


function MyApp({ Component, pageProps }: AppProps) {
  const [routineTheme, setRoutineTheme] = useState<Theme>('morning');
  const [userChoices, setUserChoices] = useState<Array<IUserChoice>>([]);
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Array<IProduct>>([]);

    useEffect(() => {
      // console.log("routineTheme", routineTheme);

      const fetchProducts = async () => {
        try {
          const response = await fetch("/api/products");
          // console.log("response", response);

          if (response.ok) {
            const data = await response.json();
            // console.log("data", data.data);
            setProducts([...data.data]);
          } else {
            throw new Error(response.statusText);
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchProducts();
    }, []);

  return (
    <ThemeProvider
      theme={routineTheme === "morning" ? morningTheme : nightTheme}
    >
      <Normalize />
      <Global />
      <Animations />
      <RoutineContext.Provider value={{ routineTheme, setRoutineTheme }}>
        <ProductContext.Provider value={{ products, setProducts }}>
          <RecommendedContext.Provider
            value={{ recommendedProducts, setRecommendedProducts }}
          >
            <UserChoicesContext.Provider
              value={{ userChoices, setUserChoices }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserChoicesContext.Provider>
          </RecommendedContext.Provider>
        </ProductContext.Provider>
      </RoutineContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
