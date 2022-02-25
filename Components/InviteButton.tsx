import styled from "styled-components";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { userInfo } from "os";
import { useEffect, useState } from "react";

const Button = styled.button<{ disabledCustom: boolean }>`
  text-transform: uppercase;
  font: Roboto;
  font-weight: bold;
  font-size: 32px;
  padding: 10px 40px;
  background-color: white;
  color: ${({ disabledCustom }) =>
  disabledCustom ? "#CCC" : "black"};
  cursor: ${({ disabledCustom }) =>
    disabledCustom ? "not-allowed" : "pointer"};
  border: 3px solid
    ${({ theme, disabledCustom }) =>
      disabledCustom ? "#CCC " : theme.colors.yellow};
  box-shadow: -0.5rem 0.5rem
    ${({ theme, disabledCustom }) =>
      disabledCustom ? "#CCC" : theme.colors.yellow};
`;

const InviteButton = () => {
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    const getAlerts = () => {
      const db = getDatabase();
      const alertsRef = ref(db, "alerts/1");
      onValue(alertsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setAlerts(data);
      });
    };

    getAlerts();
  }, [setAlerts]);

  const gameInProgress = true;
  const isOwner = false;

  const disabled = gameInProgress && isOwner;

  const createInvite = async () => {
    if (disabled) {
      return;
    }

    const db = getDatabase();

    const res = await set(ref(db, "alerts/1"), {
      owner: "neomaxzero@gmail.com",
      participants: [
        { email: "pauline.wang@wetransfer.com", state: "ACCEPTED" },
      ],
    });

    console.log("Succeed?", res);
  };

  return (
    <Button disabledCustom={disabled} onClick={createInvite}>
      Send request
    </Button>
  );
};

export default InviteButton;
