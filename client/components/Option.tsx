import Link from "next/link";
import questions from "../data/questions";
import {
  IUserChoice,
  UserChoicesContext,
  RecommendedContext,
  IProduct,
} from "../../pages/_app";
import { useContext } from "react";
import { useRouter } from "next/router";
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
  products: IProduct[];
}> = ({ children, index, question, products }) => {
  // console.log("userChoices", userChoices);
  const { userChoices, setUserChoices } = useContext(UserChoicesContext);
  const { recommendedProducts, setRecommendedProducts } =
    useContext(RecommendedContext);
  const route = useRouter();

  const getUserAnswer: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (e) => {
    const userChoicesCopy: IUserChoice[] = [
      ...userChoices,
      {
        id: (index + 1).toString(), 
        question,
        answer: optionId,
      },
    ];

    setUserChoices(userChoicesCopy);
    // evaluateAnswer(e);
  };

  const removeProducts = (arr1: IProduct[], arr2: IProduct[]) => {
    return arr1.filter((x) => {
      return arr2.findIndex((t) => t.name === x.name) === -1;
    });
  };

  const evaluateAnswer: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (e) => {
    const { option } =  e.currentTarget.dataset;
    if (route.asPath === `/question/2`) {
      // console.log("2ND QUESTION");
      // todo remove loops, dont need to loop just target the right index of userChoices

      if (option === `I'll just say "oil slick" and leave it at that`) {
        const filteredProducts = products.filter(
          (product) =>
            product.skin_type.includes("all") ||
            product.skin_type.includes("oily")
        );
        setRecommendedProducts(filteredProducts);
      } else if (option === "Normal. Aren't I lucky?") {
        const filteredProducts = products.filter(
          (product) =>
            product.skin_type.includes("all") ||
            product.skin_type.includes("normal")
        );
        setRecommendedProducts(filteredProducts);
      } else if (option === "Combination -- dry here, oily there, just right in other spots") {
        const filteredProducts = products.filter(
          (product) =>
            product.skin_type.includes("all") ||
            product.skin_type.includes("combination")
        );
        setRecommendedProducts(filteredProducts);
      } else if (option === "Drier than the Sahara") {
        const filteredProducts = products.filter(
          (product) =>
            product.skin_type.includes("all") ||
            product.skin_type.includes("dry")
        );
        setRecommendedProducts(filteredProducts);
      } else if (option === "Always red, itchy & and irritated") {
        const filteredProducts = products.filter(
          (product) =>
            product.skin_type.includes("all") ||
            product.skin_type.includes("sensitive")
        );
        setRecommendedProducts(filteredProducts);
      }
    }

    if (route.asPath === `/question/3`) {
      // console.log("3RD QUESTION");
      console.log("recommendedProducts", recommendedProducts);
    }

    if (route.asPath === `/question/4`) {
      if (option === `Time is precious so the shorter the better`) {
        const filteredProducts = recommendedProducts.filter(
          (recommendedProduct) => recommendedProduct.category === "sunscreen"
        );
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          filteredProducts
        );
        setRecommendedProducts(newRecommendedProducts);
      } else if (
        option ===
          "As long as possible, my skincare routine is my self-care ritual" ||
        option ===
          "I don't mind dedicating a little extra time to it, but let's not go crazy here"
      ) {
        const filteredProducts = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.category === "moisturizer" &&
            recommendedProduct.spf
        );
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          filteredProducts
        );
        setRecommendedProducts(newRecommendedProducts);
      }
    }

    if (route.asPath === `/question/5`) {
      if (option === "I don't wear any") {
        const filteredProducts = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.category === "makeup_remover" &&
            recommendedProduct.removes_makeup
        );
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          filteredProducts
        );
        // console.log("newRecommendedProducts", newRecommendedProducts);
        setRecommendedProducts(newRecommendedProducts);
      } else if (option === "I go for a very minimal and natural makeup look") {
        const filterRecommended = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.category === "makeup_remover" &&
            (recommendedProduct.texture === "wipes" ||
              recommendedProduct.texture === "water")
        );
        // const newRecommendedProducts = removeProducts(recommendedProducts, filteredProducts);
        // console.log("filteredProducts", filterRecommended);
        // setRecommendedProducts([...newRecommendedProducts]);
        if (filterRecommended.length === 0) {
          const filteredProducts = products.filter(
            (product) =>
              product.category === "makeup_remover" &&
              (product.texture === "wipes" || product.texture === "water")
          );
          setRecommendedProducts([...recommendedProducts, ...filteredProducts]);
        }
      } else if (option === "A decent amount, but not full coverage") {
        const filterRecommended = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.category === "makeup_remover" &&
            recommendedProduct.texture === "water"
        );
        // console.log("filteredProducts", filterRecommended);
        // setRecommendedProducts([...newRecommendedProducts]);
        if (filterRecommended.length === 0) {
          const filteredProducts = products.filter(
            (product) =>
              product.category === "makeup_remover" &&
              product.texture === "water"
          );
          setRecommendedProducts([...recommendedProducts, ...filteredProducts]);
        }
      } else if (option === "I always go full out glam") {
        const filterRecommended = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.category === "makeup_remover" &&
            recommendedProduct.texture === "balm"
        );
        // console.log("filterRecommended", filterRecommended);
        // setRecommendedProducts([...newRecommendedProducts]);
        if (filterRecommended.length === 0) {
          const filteredProducts = products.filter(
            (product) =>
              product.category === "makeup_remover" &&
              product.texture === "balm"
          );
          // console.log("filterRecommended", filterRecommended);
          setRecommendedProducts([...recommendedProducts, ...filteredProducts]);
        }
      }
    }

    if (route.asPath === `/question/6`) {
      // console.log("recommendedProducts", recommendedProducts);
    }

    if (route.asPath === `/question/7`) {
      if (option === "Fair" || option === "Light") {
        const filterRecommended = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.sunscreen_type?.includes("physical") ||
            recommendedProduct.sunscreen_type?.includes("chemical")
        );
        // console.log("filterRecommended", filterRecommended);
        // setRecommendedProducts([...newRecommendedProducts]);
        if (filterRecommended.length === 0) {
          const filteredProducts = products.filter(
            (product) =>
              product.sunscreen_type?.includes("physical") ||
              product.sunscreen_type?.includes("chemical")
          );
          // console.log("filterRecommended", filterRecommended);
          setRecommendedProducts([...recommendedProducts, ...filteredProducts]);
        }
      } else if (
        option === "Medium" ||
        option === "Olive" ||
        option === "Dark"
      ) {
        const productsToRemove = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.sunscreen_type?.includes("physical")
        );
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          productsToRemove
        );
        setRecommendedProducts(newRecommendedProducts);

        const filterRecommended = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.sunscreen_type?.includes("chemical")
        );

        if (filterRecommended.length === 0) {
          const filteredProducts = products.filter((product) =>
            product.sunscreen_type?.includes("chemical")
          );
          setRecommendedProducts([...recommendedProducts, ...filteredProducts]);
        }
      }
    }

    if (route.asPath === `/question/8`) {
      // console.log("recommendedProducts", recommendedProducts);

      if (option === "Less than 20 minutes. I avoid the sun like the plague") {
        const productsToRemove = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.spf !== undefined && recommendedProduct.spf > 30
        );
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          productsToRemove
        );
        setRecommendedProducts(newRecommendedProducts);

        const filterRecommended = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.spf !== undefined && recommendedProduct.spf <= 30
        );

        if (filterRecommended.length === 0) {
          const filteredProducts = products.filter(
            (product) => product.spf !== undefined && product.spf <= 30
          );
          setRecommendedProducts([...recommendedProducts, ...filteredProducts]);
        }
      } else if (
        option === "20-60 minutes. I'm all about moderation" ||
        option === "More than an hour. Call me a sun goddess"
      ) {
        const productsToRemove = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.spf !== undefined && recommendedProduct.spf < 30
        );
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          productsToRemove
        );
        setRecommendedProducts(newRecommendedProducts);

        const filterRecommended = recommendedProducts.filter(
          (recommendedProduct) =>
            recommendedProduct.spf !== undefined && recommendedProduct.spf >= 30
        );

        if (filterRecommended.length === 0) {
          const filteredProducts = products.filter(
            (product) => product.spf !== undefined && product.spf >= 30
          );
          setRecommendedProducts([...recommendedProducts, ...filteredProducts]);
        }
      }
    }

    if (route.asPath === `/question/9`) {
      console.log("userChoices", userChoices);
      console.log("recommendedProducts", recommendedProducts);

      if (option === "Yes") {
        const filteredProducts = recommendedProducts.filter(
          (recommendedProduct) => !recommendedProduct.has_fragrance
        );
        // console.log("HELLO", filteredProducts);
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          filteredProducts
        );
        setRecommendedProducts(newRecommendedProducts);
      } else if (option === "No") {
        const filteredProducts = recommendedProducts.filter(
          (recommendedProduct) => recommendedProduct.has_fragrance
        );
        const newRecommendedProducts = removeProducts(
          recommendedProducts,
          filteredProducts
        );
        setRecommendedProducts(newRecommendedProducts);
      } else if (option === "No preference") {
        return;
      }
    }

    // if (route.asPath === `/question/10`) {
    //   console.log("recommendedProducts", recommendedProducts);
    // }
  };

  return (
    <>
      {route.asPath === `/question/${questions.length}` ? (
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
