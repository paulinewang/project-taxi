import { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import Banners from "./Banners";

import Header from "./Header";

const Main = styled.main`
  display: flex;
  justify-content: space-between;
`;

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      <Banners />
    </>
  );
};

export default Layout;
