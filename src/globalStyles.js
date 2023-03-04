import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-size:18px;
    font-family: Roboto;
  }

  p {
    margin: 0;
    padding: 0;
  }

  a {
    color: unset;
    text-decoration: auto;
  }
`;

export default GlobalStyle;
