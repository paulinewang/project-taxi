import styled from "styled-components";
import { getIsLoggedIn } from "../state/selectors";
import useStore from "../state/store";
import InviteButton from "./InviteButton";
import OngoingGame from "./OngoingGame";
import PlayerList from "./PlayerList";

const RightColumn = styled.div`
  flex-direction: column;
  justify-content: space-between;
`;

const Sender = () => {
  const isLoggedIn = useStore(getIsLoggedIn);
  const {alert} = useStore();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <PlayerList />
      <RightColumn>
        <InviteButton />
        {alert &&
          <OngoingGame />
        }
      </RightColumn>
    </>
  );
};

export default Sender;
