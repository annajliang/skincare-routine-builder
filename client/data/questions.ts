import { IProduct } from "../../pages/_app";
import { removeProducts } from "../utils/helpers";

interface ICommand {
  action: "add" | "remove" | "nothing";
  product: IProduct;
}

const questions = [
  {
    id: "1",
    questionSpanOne: "How would you describe",
    questionSpanTwo: "your skin type?",
    options: [
      {
        id: 0,
        text: `I'll just say "oil slick" and leave it at that`,
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_type?.includes("all") ||
                product.skin_type?.includes("oily")
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 1,
        text: "Normal. Aren't I lucky?",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_type?.includes("all") ||
                product.skin_type?.includes("normal")
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 2,
        text: "Combination -- dry here, oily there, just right in other spots",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_type?.includes("all") ||
                product.skin_type?.includes("combination")
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 3,
        text: "Drier than the Sahara",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_type?.includes("all") ||
                product.skin_type?.includes("dry")
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 4,
        text: "Always red, itchy & and irritated",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_type?.includes("all") ||
                product.skin_type?.includes("sensitive")
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
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
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_concerns?.includes("acne") &&
                product.category === "treatment"
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 1,
        text: "Aging",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_concerns?.includes("aging") &&
                product.category === "treatment"
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 2,
        text: "Dryness",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.skin_concerns?.includes("dryness") &&
                product.category === "treatment"
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 3,
        text: "Blackheads & visible pores",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                (product.skin_concerns?.includes("blackheads") ||
                  product.skin_concerns?.includes("large pores")) &&
                product.category === "treatment"
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 4,
        text: "Dark spots & hyperpigmentation",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                (product.skin_concerns?.includes("dark spots") ||
                  product.skin_concerns?.includes("hyperpigmentation")) &&
                product.category === "treatment"
            )
            .map((product) => {
              return [
                {
                  action: "add",
                  product,
                },
              ];
            });
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
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.category === "sunscreen" || product.category === "toner"
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 1,
        text: "I don't mind dedicating a little extra time to it, but let's not go crazy here",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) => product.category === "moisturizer" && product.spf
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 2,
        text: "As long as possible, my skincare routine is my self-care ritual",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) => product.category === "moisturizer" && product.spf
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
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
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter((product) => product.category === "makeup_remover")
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 1,
        text: "I go for a very minimal and natural makeup look",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.category === "makeup_remover" &&
                product.texture === "balm"
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 2,
        text: "A decent amount, but not full coverage",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.category === "makeup_remover" &&
                product.texture === "wipes"
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 3,
        text: "I always go full out glam",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.category === "makeup_remover" &&
                product.texture === "wipes"
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
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
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.sunscreen_type?.includes("physical") ||
                product.sunscreen_type?.includes("chemical")
            )
            .map((product) => {
              return [
                {
                  action: "nothing",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 1,
        text: "Light",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.sunscreen_type?.includes("physical") ||
                product.sunscreen_type?.includes("chemical")
            )
            .map((product) => {
              return [
                {
                  action: "nothing",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 2,
        text: "Medium",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.sunscreen_type?.length === 1 &&
                product.sunscreen_type?.includes("physical")
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 3,
        text: "Olive",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.sunscreen_type?.length === 1 &&
                product.sunscreen_type?.includes("physical")
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 4,
        text: "Dark",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) =>
                product.sunscreen_type?.length === 1 &&
                product.sunscreen_type?.includes("physical")
            )
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
    ],
  },
  {
    id: "6",
    questionSpanOne: "Your average daily",
    questionSpanTwo: "sun exposure is:",
    options: [
      {
        id: 0,
        text: "Less than 20 minutes. I avoid the sun like the plague",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter((product) => product.spf !== undefined && product.spf > 40)
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 1,
        text: "20-60 minutes. I'm all about moderation",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter((product) => product.spf !== undefined && product.spf < 40)
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 2,
        text: "More than an hour. Call me a sun goddess",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter((product) => product.spf !== undefined && product.spf < 40)
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
    ],
  },
  {
    id: "7",
    questionSpanOne: "Do you enjoy when your",
    questionSpanTwo: "products are scented?",
    options: [
      {
        id: 0,
        text: "Yes",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter((product) => !product.has_fragrance)
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 1,
        text: "No",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter((product) => product.has_fragrance)
            .map((product) => {
              return [
                {
                  action: "remove",
                  product,
                },
              ];
            });
        },
      },
      {
        id: 2,
        text: "No preference",
        filterFn: (arr: IProduct[]) => {
          return arr
            .filter(
              (product) => product.has_fragrance || !product.has_fragrance
            )
            .map((product) => {
              return [
                {
                  action: "nothing",
                  product,
                },
              ];
            });
        },
      },
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
