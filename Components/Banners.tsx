import { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { INVITATION_STATUS } from "../state/dbTypes";
import useStore from "../state/store";

const Taxi = ({ count, email }) => {
  const props = useSpring({
    to: { right: `${90 - count * 10}%` },
    from: { right: "-10%" },
    config: { duration: 1300 },
  });

  return (
    <animated.div
      style={{
        position: "fixed",
        bottom: 10,
        fontSize: "56px",
        transform: "rotate(45deg)",
        ...props,
      }}
    >
      🚕
    </animated.div>
  );
};

const Banners = () => {
  const { alert } = useStore();

  if (!alert?.participants) {
    return null;
  }

  return [...alert?.participants]
    .filter((taxi) => taxi.status === INVITATION_STATUS.ACCEPTED)
    .map((taxi, i) => <Taxi key={i} count={i + 1} email={taxi.email}/>);
};

export default Banners;
