import { getIsLoggedIn } from "../state/selectors";
import useStore from "../state/store";
import InviteButton from "./InviteButton";
import OngoingGame from "./OngoingGame";
import PlayerList from "./PlayerList";

const Sender = () => {
  const isLoggedIn = useStore(getIsLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <PlayerList />

      <InviteButton />
      <OngoingGame />
    </>
  );
};

export default Sender;
