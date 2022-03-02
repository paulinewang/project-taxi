import create from "zustand";

type UserInfo = {
  email?: string;
  displayName?: string;
};

export type State = {
  user?: UserInfo;
  setUser: (user: UserInfo) => void;
  setPlayers: (players: UserInfo[]) => void; 
  players: UserInfo[];
};

const useStore = create<State>((set: any) => ({
  user: {},
  setUser: (user: any) => set(() => ({ user })),
  setPlayers: (players: UserInfo[]) => set(() => ({ players })),
  players: [],
}));

export default useStore;
