import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { ThemeProvider } from "styled-components";
import theme from "../shared/theme";
import GlobalStyle from "../shared/GlobalStyle";

const firebaseConfig = {
  apiKey: "AIzaSyARl7ImqyHzciv2xZe_PNlUXs0ACdxeHbY",
  authDomain: "project-taxi-8a2bf.firebaseapp.com",
  databaseURL:
    "https://project-taxi-8a2bf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-taxi-8a2bf",
  storageBucket: "project-taxi-8a2bf.appspot.com",
  messagingSenderId: "529990881670",
  appId: "1:529990881670:web:c3b73b56fbe6e27b849c07",
};




const app = initializeApp(firebaseConfig);
console.log(app);
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
