import { State } from "./store";

export const isOwner =
  (currentOwner: string) =>
  (state: State): boolean =>
    state.user ? state.user.email === currentOwner: false;

export const getEmail = (state: State) => state.user ? state.user.email: '';

export const getIsLoggedIn = (state: State):boolean => (state.user && state.user.email) ? true: false;
