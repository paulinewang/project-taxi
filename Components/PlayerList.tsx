import { useEffect } from "react";
import styled from "styled-components";
import { INVITATION_STATUS } from "../state/dbTypes";
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
  const { setPlayers, players, alert } = useStore();
  const email = useStore(getEmail);

  useEffect(() => {
    fetch("api/hello")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.userRecords.users);
      });
  }, []);

const hasAcceptedGame= (player:any) => {
  const compliantParticipant = alert?.participants?.find((participant) => {
    console.log("player", player)
    console.log("participant", participant)
    if(participant.email === player.email && participant.status === INVITATION_STATUS.ACCEPTED) {
      return true;
    }
  })
  return Boolean(compliantParticipant);
}

  return (
    <PlayerWrapper>
      <Title>Players</Title>
      {players?.map((player: any) => {
        if (player.email === email) return;

        return <Player key={player.uid}>
          {player.displayName}
          {hasAcceptedGame(player) ? 'ACCEPTED' : 'DECLINED'}
        </Player>;
      })}
    </PlayerWrapper>
  );
};

export default PlayerList;
