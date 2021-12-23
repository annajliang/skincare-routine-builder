import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Sen', sans-serif;
    /* background: #FFC5C3; */
  }

  h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 7rem;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 2rem;
  }

  h1 span:first-child{
    color: #fff;
    text-shadow: 5px 4px 0px #DA7153;
    -webkit-text-fill-color: #fff;
    /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #DA7153;
  }

  h1 span:last-child {
    color: #DA7153;
    position: relative;
    bottom: 0;
  }

  p {
    font-size: 1.5rem;
    color: #6F4938;
    line-height: 1.8;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default Global;