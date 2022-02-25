import { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "firebase/compat/app";

import Header from "./Header";
import InviteButton from "./InviteButton";
import OngoingGame from "./OngoingGame";
import PlayerList from "./PlayerList";

const Main = styled.main`
  display: flex;
  justify-content: space-between;
`;

const RightColumn = styled.div`
  flex-direction: column;
  justify-content: space-between;
`;

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [players, setPlayers] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>("");

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((user: any) => setCurrentUserId(user?.uid));

    const id = firebase.auth().currentUser?.uid;
    setCurrentUserId(id);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("api/hello")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.userRecords.users);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Main>
        {currentUserId ? (
          <>
            <PlayerList
              players={!isLoading ? players : []}
              currentUserId={currentUserId}
            />
            <RightColumn>
              <InviteButton />
              <OngoingGame />
            </RightColumn>
          </>
        ) : (
          <p>Please sign in</p>
        )}
      </Main>
    </>
  );
};

export default Layout;
