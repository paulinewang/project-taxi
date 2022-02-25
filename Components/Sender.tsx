import { getIsLoggedIn } from "../state/selectors";
import useStore from "../state/store";
import InviteButton from "./InviteButton";
import OngoingGame from "./OngoingGame";

const Sender = () => {
  const isLoggedIn = useStore(getIsLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <InviteButton />
      <OngoingGame />
    </>
  );
};

export default Sender;
