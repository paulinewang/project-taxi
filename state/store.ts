import create from "zustand";

type UserInfo = {
  email?: string;
  displayName?: string;
};

export type State = {
  user?: UserInfo;
  setUser: (user: UserInfo) => void;
};

const useStore = create<State>((set: any) => ({
  user: {},
  setUser: (user: any) => set(() => ({ user })),
}));

export default useStore;
