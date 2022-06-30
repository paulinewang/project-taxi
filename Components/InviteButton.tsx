import styled from "styled-components";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import useStore from "../state/store";
import { getEmail, isOwner as getIsOwner } from "../state/selectors";
import { Alert, INVITATION_STATUS } from "../state/dbTypes";

const Button = styled.button<{ disabledCustom?: boolean }>`
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

const Input = styled.input`
  border: 3px solid ${({ theme }) => theme.colors.green};
  padding: 10px;
  margin: 10px;
  margin-top: 24px;
`;

const InviteButton = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { alert, setAlert } = useStore();
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

  const getPreviousParticipants = () =>
    alert && alert.participants ? alert.participants : [];

  const getLoggedInUserStatus = () => {
    const previousParticipants = getPreviousParticipants();

    const myself = previousParticipants.find(
      (participant) => participant.email === emailUser
    );
    return myself?.status;
  };

  const gameAccepted = getLoggedInUserStatus() === INVITATION_STATUS.ACCEPTED;

  const disabled = (gameInProgress && isOwner) || gameAccepted || !inputValue;

  const db = getDatabase();

  const cancelGame = async () => {
    if (isOwner) {
      const res = await remove(ref(db, "alerts/1"));
    } else {
      const previousParticipants =
        alert && alert.participants ? alert.participants : [];

      const currentUserHasAlreadyReply = previousParticipants.find(
        (participant) => participant.email === emailUser
      );

      if (currentUserHasAlreadyReply) {
        const res = await update(ref(db, "alerts/1"), {
          "/participants": [
            ...previousParticipants.filter(
              (participant) => participant.email !== emailUser
            ),
            { email: emailUser, status: INVITATION_STATUS.DECLINED },
          ],
        });
      } else {
        const res = await update(ref(db, "alerts/1"), {
          "/participants": [
            ...previousParticipants,
            { email: emailUser, status: INVITATION_STATUS.DECLINED },
          ],
        });
      }
    }
  };

  const onClick = async () => {
    if (disabled) {
      return;
    }

    const previousParticipants = getPreviousParticipants();

    const updatedParticipants = previousParticipants.filter(
      (participant) => participant.email !== emailUser
    );

    if (!gameInProgress || isOwner) {
      await set(ref(db, "alerts/1"), {
        owner: emailUser,
        participants: [],
      });
    } else {
      // Invitee
      const myself = getLoggedInUserStatus();

      if (myself === INVITATION_STATUS.ACCEPTED) {
        return;
      }

      await update(ref(db, "alerts/1"), {
        "/participants": [
          ...updatedParticipants,
          { email: emailUser, status: INVITATION_STATUS.ACCEPTED },
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
    <>
      {!gameInProgress && (
        <Input
          placeholder="Where is the fun?"
          onChange={({ target }) => setInputValue(target.value)}
        />
      )}
      <Button disabledCustom={disabled} onClick={onClick}>
        {getButtonLabel()}
      </Button>
      {gameInProgress && (
        <Button onClick={cancelGame}>
          {isOwner ? "Cancel the fun" : "No fun for me"}
        </Button>
      )}
    </>
  );
};

export default InviteButton;
