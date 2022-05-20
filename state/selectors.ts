import { State } from "./store";

export const isOwner =
  (currentOwner: string) =>
  (state: State): boolean =>
    state.user ? state.user.email === currentOwner: false;

export const getEmail = (state: State) => state.user ? state.user.email: '';

export const getIsLoggedIn = (state: State):boolean => (state.user && state.user.email) ? true: false;

export const getPreviousParticipants = (state: State) =>
  state.alert && state.alert.participants ? state.alert.participants : [];

export const getLoggedInUserStatus = (state: State): string | undefined => {
  const previousParticipants = getPreviousParticipants(state);
  const myself = previousParticipants.find(
    (participant) => participant.email === getEmail(state)
  );
  return myself?.status;
}
