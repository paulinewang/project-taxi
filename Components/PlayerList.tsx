import { useEffect } from "react";
import styled from "styled-components";
import { getEmail } from "../state/selectors";
import useStore from "../state/store";

const PlayerWrapper = styled.div`
  padding: 10px 40px;
  border: 3px solid ${({ theme }) => theme.colors.pink};
  box-shadow: -0.5rem 0.5rem ${({ theme }) => theme.colors.pink};
`;

const Title = styled.h1`
  text-transform: uppercase;
`;

const Player = styled.li`
  list-style-type: none;
`;

const PlayerList = () => {
  const { setPlayers, players } = useStore();
  const email = useStore(getEmail);

  useEffect(() => {
    fetch("api/hello")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.userRecords.users);
      });
  }, []);

  return (
    <PlayerWrapper>
      <Title>Players</Title>
      {players?.map((player: any) => {
        if (player.email === email) return;

        return <Player key={player.uid}>{player.displayName}</Player>;
      })}
    </PlayerWrapper>
  );
};

export default PlayerList;
