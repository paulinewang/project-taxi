import { useEffect } from "react";
import styled from "styled-components";
import { INVITATION_STATUS } from "../state/dbTypes";
import { getEmail, isOwner } from "../state/selectors";
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
  const { setPlayers, players, alert } = useStore();
  const email = useStore(getEmail);

  useEffect(() => {
    fetch("api/hello")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.userRecords.users);
      });
  }, []);

const returnStatus= (player:any) => {
  if(player.email === alert?.owner) {
    return '👑';
  }

  const findParticipant = alert?.participants?.find((participant) => {
    if(participant.email === player.email) {
      return true;
    }
  })

  if(!findParticipant) {
    return '🟡';
  }

  if(findParticipant.status === INVITATION_STATUS.ACCEPTED) {
    return '🟢';
  }

  return '🔴';
}

  return (
    <PlayerWrapper>
      <Title>Players</Title>
      {players?.map((player: any) => {
        if (player.email === email) return;

        return <Player key={player.uid}>
          {returnStatus(player)}&nbsp;
          {player.displayName}
        </Player>;
      })}
    </PlayerWrapper>
  );
};

export default PlayerList;
