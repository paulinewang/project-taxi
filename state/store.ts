import create from "zustand";
import { Alert } from "../state/dbTypes";


type UserInfo = {
  email?: string;
  displayName?: string;
};

export type State = {
  user?: UserInfo;
  setUser: (user: UserInfo) => void;
  setPlayers: (players: UserInfo[]) => void; 
  players: UserInfo[];
  alert: Alert | undefined;
  setAlert: (alert:Alert) => void;
};

const useStore = create<State>((set: any) => ({
  user: {},
  setUser: (user: any) => set(() => ({ user })),
  setPlayers: (players: UserInfo[]) => set(() => ({ players })),
  players: [],
  alert: undefined,
  setAlert: (alert:Alert) => set(()=> ({alert})),
}));

export default useStore;
