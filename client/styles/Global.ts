import { createGlobalStyle } from 'styled-components';
import { DefaultTheme } from 'styled-components';

const Global = createGlobalStyle<{theme: DefaultTheme}>`
  html {
    font-size: 62.5%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Sen', sans-serif;
    background: ${({ theme }) => theme.body};
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
    text-shadow: 5px 4px 0px ${({ theme }) => theme.color};
    -webkit-text-fill-color: #fff;
    /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${({ theme }) => theme.color};
  }

  h1 span:last-child {
    color: ${({ theme }) => theme.color};
    position: relative;
    bottom: 0;
  }

  p {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textColor};
    line-height: 1.8;
  }

  a {
    color: ${({ theme }) => theme.textColor};
    text-decoration: none;
      transition: 0.3s;

    :hover {
      color: #da7153;
    }
  }

  * {
    box-sizing: border-box;
  }
`;

export default Global;