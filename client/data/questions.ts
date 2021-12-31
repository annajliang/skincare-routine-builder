import { IProduct } from "../../pages/_app";
import {
  filterQuestion1,
  filterQuestion2,
  filterQuestion3,
  filterQuestion4,
  filterQuestion5B,
  filterQuestion6,
} from "../utils/helpers";
import { ICommand } from "../components/Calculating";

interface IOption {
  id: number;
  text: string;
  filterFn: ((products: IProduct[]) => ICommand[]) | null;
}

interface IQuestion {
  id: string;
  questionSpanOne: string;
  questionSpanTwo: string;
  options: IOption[]
}

const questions: IQuestion[] = [
  {
    id: "1",
    questionSpanOne: "How would you describe",
    questionSpanTwo: "your skin type?",
    options: [
      {
        id: 0,
        text: `I'll just say "oil slick" and leave it at that`,
        filterFn: (products) => {
          return filterQuestion1(products, "oily");
        },
      },
      {
        id: 1,
        text: "Normal. Aren't I lucky?",
        filterFn: (products) => {
          return filterQuestion1(products, "normal");
        },
      },
      {
        id: 2,
        text: "Combination -- dry here, oily there, just right in other spots",
        filterFn: (products) => {
          return filterQuestion1(products, "combination");
        },
      },
      {
        id: 3,
        text: "Drier than the Sahara",
        filterFn: (products) => {
          return filterQuestion1(products, "dry");
        },
      },
      {
        id: 4,
        text: "Always red, itchy & and irritated",
        filterFn: (products) => {
          return filterQuestion1(products, "sensitive");
        },
      },
    ],
  },
  {
    id: "2",
    questionSpanOne: "What is your",
    questionSpanTwo: "top skin concern?",
    options: [
      {
        id: 0,
        text: "Acne & blemishes",
        filterFn: (products) => {
          return filterQuestion2(products, "acne");
        },
      },
      {
        id: 1,
        text: "Aging",
        filterFn: (products) => {
          return filterQuestion2(products, "aging");
        },
      },
      {
        id: 2,
        text: "Dryness",
        filterFn: (products) => {
          return filterQuestion2(products, "dryness");
        },
      },
      {
        id: 3,
        text: "Blackheads & visible pores",
        filterFn: (products) => {
          return filterQuestion2(products, "blackheads & large pores");
        },
      },
      {
        id: 4,
        text: "Dark spots & hyperpigmentation",
        filterFn: (products) => {
          return filterQuestion2(products, "dark spots & hyperpigmentation");
        },
      },
    ],
  },
  {
    id: "3",
    questionSpanOne: "How much time do you prefer",
    questionSpanTwo: "to spend on your routine?",
    options: [
      {
        id: 0,
        text: "Time is precious so the shorter the better",
        filterFn: (products) => {
          return products
            .filter(
              (product) =>
                // (product.category === "moisturizer" && !product.spf) ||
                product.category === "sunscreen" || product.category === "toner"
            )
            .map((product) => {
              return {
                action: "remove",
                product,
              };
            });
        },
      },
      {
        id: 1,
        text: "I don't mind dedicating a little extra time to it, but let's not go crazy here",
        filterFn: (products) => {
          return filterQuestion3(products);
        },
      },
      {
        id: 2,
        text: "As long as possible, my skincare routine is my self-care ritual",
        filterFn: (products) => {
          return filterQuestion3(products);
        },
      },
    ],
  },
  {
    id: "4",
    questionSpanOne: "How much makeup",
    questionSpanTwo: "do you wear on the daily?",
    options: [
      {
        id: 0,
        text: "I don't wear any",
        filterFn: (products) => {
          return products
            .filter((product) => product.category === "makeup_remover")
            .map((product) => {
              return {
                action: "remove",
                product,
              };
            });
        },
      },
      {
        id: 1,
        text: "I go for a very minimal and natural makeup look",
        filterFn: (products) => {
          return filterQuestion4(products, "balm");
        },
      },
      {
        id: 2,
        text: "A decent amount, but not full coverage",
        filterFn: (products) => {
          return filterQuestion4(products, "wipes");
        },
      },
      {
        id: 3,
        text: "I always go full out glam",
        filterFn: (products) => {
          return filterQuestion4(products, "wipes");
        },
      },
    ],
  },
  {
    id: "5",
    questionSpanOne: "How would you",
    questionSpanTwo: "describe your skin tone?",
    options: [
      {
        id: 0,
        text: "Fair",
        filterFn: null,
      },
      {
        id: 1,
        text: "Light",
        filterFn: null,
      },
      {
        id: 2,
        text: "Medium",
        filterFn: (products) => {
          return filterQuestion5B(products);
        },
      },
      {
        id: 3,
        text: "Olive",
        filterFn: (products) => {
          return filterQuestion5B(products);
        },
      },
      {
        id: 4,
        text: "Dark",
        filterFn: (products) => {
          return filterQuestion5B(products);
        },
      },
    ],
  },
  {
    id: "6",
    questionSpanOne: "Do you enjoy when your",
    questionSpanTwo: "products are scented?",
    options: [
      {
        id: 0,
        text: "Yes",
        filterFn: (products) => {
          return products
            .filter((product) => !product.has_fragrance)
            .map((product) => {
              return {
                action: "remove",
                product,
              };
            });
        },
      },
      {
        id: 1,
        text: "No",
        filterFn: (products) => {
          return products
            .filter((product) => product.has_fragrance)
            .map((product) => {
              return {
                action: "remove",
                product,
              };
            });
        },
      },
      {
        id: 2,
        text: "No preference",
        filterFn: null,
      },
    ],
  },
  {
    id: "7",
    questionSpanOne: "How much money do you",
    questionSpanTwo: "prefer to spend on products?",
    options: [
      {
        id: 0,
        text: "As little as possible",
        filterFn: (products: IProduct[]): ICommand[] => {
          return products
            .filter(
              (product) =>
                product.price_range === "$$" || product.price_range === "$$$"
            )
            .map((product) => {
              return {
                action: "remove",
                product,
              };
            });
        },
      },
      {
        id: 1,
        text: "I'm ok with spending a little more than average",
        filterFn: (products: IProduct[]): ICommand[] => {
          return products
            .filter((product) => product.price_range === "$$$")
            .map((product) => {
              return {
                action: "remove",
                product,
              };
            });
        },
      },
      {
        id: 2,
        text: "I'm willing to spend any amount if the products work",
        filterFn: null,
      },
      //   {
      //     id: 3,
      //     text: "I only ever purchase the most bougie & luxurious skincare!",
      //     filterFn: (products: IProduct[]) => {
      //       return products
      //         .filter(
      //           (product) =>
      //             product.price_range === "$" ||
      //             product.price_range === "$$"
      //         )
      //         .map((product) => {
      //           return [
      //             {
      //               action: "remove",
      //               product,
      //             },
      //           ];
      //         });
      //     },
      //   },
    ],
  },
  //   {
  //     id: "8",
  //     questionSpanOne: "Cruelty-free & vegan",
  //     questionSpanTwo: "skincare are important to you.",
  //     options: [
  //       { id: 0, text: "Yes 100%", filterFn: () => console.log("test") },
  //       {
  //         id: 1,
  //         text: "No, I have no preference",
  //         filterFn: () => console.log("test"),
  //       },
  //     ],
  //   },
];

export default questions;
