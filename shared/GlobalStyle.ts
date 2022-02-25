import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
`;

export default GlobalStyle;
