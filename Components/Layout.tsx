import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";

const Main = styled.main`
  flex: 1;
`;

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
