import { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import useStore from "../state/store";

const Taxi = ({ count }) => {
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

  console.log(alert?.participants);

  if (!alert?.participants) {
    return null;
  }

  return [...alert?.participants].map((a, i) => <Taxi key={i} count={i + 1} />);
};

export default Banners;
