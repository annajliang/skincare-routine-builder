import { IProduct } from "../../pages/_app";
import { removeProducts } from "../utils/helpers";

interface ICommand {
  action: "add" | "remove";
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
                product.skin_type.includes("all") ||
                product.skin_type.includes("oily")
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
                product.skin_type.includes("all") ||
                product.skin_type.includes("normal")
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
                product.skin_type.includes("all") ||
                product.skin_type.includes("combination")
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
                product.skin_type.includes("all") ||
                product.skin_type.includes("dry")
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
                product.skin_type.includes("all") ||
                product.skin_type.includes("sensitive")
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
//   {
//     id: "2",
//     questionSpanOne: "What is your",
//     questionSpanTwo: "top skin concern?",
//     options: [
//       {
//         id: 0,
//         text: "Acne & blemishes",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 1,
//         text: "Aging",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 2,
//         text: "Dryness",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 3,
//         text: "Blackheads & visible pores",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 4,
//         text: "Acne scars & hyperpigmentation",
//         filterFn: () => console.log("test"),
//       },
//     ],
//   },
//   {
//     id: "3",
//     questionSpanOne: "How much time do you prefer",
//     questionSpanTwo: "to spend on your routine?",
//     options: [
//       {
//         id: 0,
//         text: "Time is precious so the shorter the better",
//         filterFn: (arr: IProduct[]) => {
//           return removeProducts(
//             arr,
//             arr.filter(
//               (recommendedProduct) =>
//                 recommendedProduct.category === "sunscreen"
//             )
//           );
//         },
//       },
//       {
//         id: 1,
//         text: "I don't mind dedicating a little extra time to it, but let's not go crazy here",
//         filterFn: (arr: IProduct[]) => {
//           return removeProducts(
//             arr,
//             arr.filter(
//               (recommendedProduct) =>
//                 recommendedProduct.category === "moisturizer" &&
//                 recommendedProduct.spf
//             )
//           );
//         },
//       },
//       {
//         id: 2,
//         text: "As long as possible, my skincare routine is my self-care ritual",
//         filterFn: (arr: IProduct[]) => {
//           return removeProducts(
//             arr,
//             arr.filter(
//               (recommendedProduct) =>
//                 recommendedProduct.category === "moisturizer" &&
//                 recommendedProduct.spf
//             )
//           );
//         },
//       },
//     ],
//   },
//   {
//     id: "4",
//     questionSpanOne: "How much makeup",
//     questionSpanTwo: "do you wear on the daily?",
//     options: [
//       {
//         id: 0,
//         text: "I don't wear any",
//         filterFn: (arr: IProduct[]) => {
//           return removeProducts(
//             arr,
//             arr.filter(
//               (recommendedProduct) =>
//                 recommendedProduct.category === "makeup_remover" &&
//                 recommendedProduct.removes_makeup
//             )
//           );
//         },
//       },
//       {
//         id: 1,
//         text: "I go for a very minimal and natural makeup look",
//         filterFn: (arr: IProduct[]) => {
//           return removeProducts(
//             arr,
//             arr.filter(
//               (recommendedProduct) =>
//                 recommendedProduct.category === "makeup_remover" &&
//                 (recommendedProduct.texture === "wipes" ||
//                   recommendedProduct.texture === "water")
//             )
//           );
//         },
//       },
//       {
//         id: 2,
//         text: "A decent amount, but not full coverage",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 3,
//         text: "I always go full out glam",
//         filterFn: () => console.log("test"),
//       },
//     ],
//   },
//   {
//     id: "5",
//     questionSpanOne: "What's missing from",
//     questionSpanTwo: "your routine?",
//     options: [
//       {
//         id: 0,
//         text: "Retinol",
//         filterFn: () => console.log("test"),
//       },
//       { id: 1, text: "Sheet mask", filterFn: () => console.log("test") },
//       {
//         id: 2,
//         text: "Hydrating serum",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 3,
//         text: "Chemical exfoliant",
//         filterFn: () => console.log("test"),
//       },
//     ],
//   },
//   {
//     id: "6",
//     questionSpanOne: "How would you",
//     questionSpanTwo: "describe your skin tone?",
//     options: [
//       {
//         id: 0,
//         text: "Fair",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 1,
//         text: "Light",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 2,
//         text: "Medium",
//         filterFn: () => console.log("test"),
//       },
//       { id: 3, text: "Olive", filterFn: () => console.log("test") },
//       { id: 4, text: "Dark", filterFn: () => console.log("test") },
//     ],
//   },
//   {
//     id: "7",
//     questionSpanOne: "Your average daily",
//     questionSpanTwo: "sun exposure is:",
//     options: [
//       {
//         id: 0,
//         text: "Less than 20 minutes. I avoid the sun like the plague",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 1,
//         text: "20-60 minutes. I'm all about moderation",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 2,
//         text: "More than an hour. Call me a sun goddess",
//         filterFn: () => console.log("test"),
//       },
//     ],
//   },
//   {
//     id: "8",
//     questionSpanOne: "Do you enjoy when your",
//     questionSpanTwo: "products are scented?",
//     options: [
//       {
//         id: 0,
//         text: "Yes",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 1,
//         text: "No",
//         filterFn: () => console.log("test"),
//       },
//       {
//         id: 2,
//         text: "No preference",
//         filterFn: () => console.log("test"),
//       },
//     ],
//   },
//   {
//     id: "9",
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
