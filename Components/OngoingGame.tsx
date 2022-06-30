import { getDatabase, ref, onValue } from "@firebase/database";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { INVITATION_STATUS } from "../state/dbTypes";
import useStore from "../state/store";

const Wrapper = styled.div`
  padding: 10px 40px;
  border: 3px solid ${({ theme }) => theme.colors.green};
  box-shadow: -0.5rem 0.5rem ${({ theme }) => theme.colors.green};
`;

const Title = styled.h1`
  text-transform: uppercase;
`;

const OngoingGame = () => {
  const [linkGame, setLinkGame] = useState();
  const { players, alert } = useStore();
  const compliantParticipantsLength =
    alert?.participants?.filter(
      (participant) => participant.status === INVITATION_STATUS.ACCEPTED
    ).length || 0;

  useEffect(() => {
    const db = getDatabase();
    const alerts = ref(db, "/alerts/1");
    onValue(alerts, (snapshot) => {
      const data = snapshot.val();

      setLinkGame(data?.linkGame);
    });
  }, [setLinkGame]);

  return (
    <Wrapper>
      <Title>Ongoing game</Title>
      <p>
        Youhou, {compliantParticipantsLength}/{players.length - 1} players have
        accepted your request!
      </p>

      <div>
        <h2>Links</h2>
        <a href="https://meet.google.com/uys-dbiq-nfm" target="blank">
          Google Meet
        </a>
        <br />

        <a href={linkGame} target="blank">
          City Guessr
        </a>
      </div>
    </Wrapper>
  );
};

export default OngoingGame;
