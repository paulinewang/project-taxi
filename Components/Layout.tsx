import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import InviteButton from "./InviteButton";
import OngoingGame from "./OngoingGame";

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
      <Main>
        <InviteButton />
        <OngoingGame />
        {children}
      </Main>
    </>
  );
};

export default Layout;
