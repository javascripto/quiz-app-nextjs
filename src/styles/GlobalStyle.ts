import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html,
  body {
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: 'Poppins', Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
