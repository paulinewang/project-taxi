import styled from "styled-components";
import { getIsLoggedIn, getLoggedInUserStatus, isOwner } from "../state/selectors";
import useStore from "../state/store";
import InviteButton from "./InviteButton";
import OngoingGame from "./OngoingGame";
import PlayerList from "./PlayerList";
import { INVITATION_STATUS } from "../state/dbTypes";

const RightColumn = styled.div`
  flex-direction: column;
  justify-content: space-between;
`;

const Sender = () => {
  const isLoggedIn = useStore(getIsLoggedIn);
  const { alert } = useStore();
  const loggedInUserStatus = useStore(getLoggedInUserStatus);

  const isOwnerReally = useStore(isOwner(alert?.owner || ""));

  const hasAccepted = loggedInUserStatus === INVITATION_STATUS.ACCEPTED;
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <PlayerList />
      <RightColumn>
        <InviteButton />
        {((alert && hasAccepted) || isOwnerReally) && <OngoingGame />}
      </RightColumn>
    </>
  );
};

export default Sender;
