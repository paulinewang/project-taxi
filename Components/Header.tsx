import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { initFirebase, signInWithGoogle } from "../shared/init";
import useStore from "../state/store";

const Head = styled.header`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const UserName = styled.span`
  margin-right: 12px;
  font-size: 12px;
`;

const NavButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 8px 16px;
  underline: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  border-bottom: 3px solid ${({ theme }) => theme.colors.yellow};

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`;

type UserData = {
  email: string;
  displayName: string;
};

const Header = () => {
  function signOut() {
    firebase.auth().signOut();
  }

  const { user, setUser} = useStore(state => state);

  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => setUser(user));
  }, []);

  return (
    <Head>
      <Logo>TAXI</Logo>
      {!user && <NavButton onClick={signInWithGoogle}>Sign in</NavButton>}
      {user && (
        <div>
          <UserName>{user.email}</UserName>
          <NavButton onClick={signOut}>Sign out</NavButton>
        </div>
      )}
    </Head>
  );
};

export default Header;
