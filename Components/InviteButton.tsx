import styled from "styled-components";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { useEffect, useState } from "react";
import useStore from "../state/store";
import { getEmail, isOwner as getIsOwner } from "../state/selectors";
import { Alert, INVITATION_STATUS } from "../state/dbTypes";

const Button = styled.button<{ disabledCustom: boolean }>`
  text-transform: uppercase;
  font: Roboto;
  font-weight: bold;
  font-size: 32px;
  padding: 10px 40px;
  background-color: white;
  color: ${({ disabledCustom }) => (disabledCustom ? "#CCC" : "black")};
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
  const {alert, setAlert} = useStore();
  const isOwner = useStore(getIsOwner(alert?.owner || ""));

  const emailUser = useStore(getEmail);
  console.log(emailUser);

  useEffect(() => {
    const getAlerts = () => {
      const db = getDatabase();
      const alertsRef = ref(db, "alerts/1");
      onValue(alertsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setAlert(data);
      });
    };

    getAlerts();
  }, [setAlert]);

  const gameInProgress = Boolean(alert);

  const disabled = gameInProgress && isOwner;

  const onClick = async () => {
    if (disabled) {
      return;
    }

    const db = getDatabase();

    if (!gameInProgress || isOwner) {
      const res = await set(ref(db, "alerts/1"), {
        owner: emailUser,
        participants: [],
      });
    } else {
      console.log("here??");
      // Invitee

      console
      const previousParticipants = (alert && alert.participants) ? alert.participants : []

      const res = await update(ref(db, "alerts/1"), {
        "/participants": [
          ...previousParticipants,
          { email: emailUser, status: INVITATION_STATUS.ACCEPTED, sherlock: 'dog' },
        ],
      });
    }
  };

  const getButtonLabel = () => {
    if (!gameInProgress) {
      return "Send Request";
    }

    if (isOwner) {
      return "Waiting";
    }

    return "Join Game";
  };

  return (
    <Button disabledCustom={disabled} onClick={onClick}>
      {getButtonLabel()}
    </Button>
  );
};

export default InviteButton;
