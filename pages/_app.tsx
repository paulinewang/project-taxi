import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import theme from "../shared/theme";
import GlobalStyle from "../shared/GlobalStyle";
import { initFirebase } from "../shared/init";

initFirebase();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
