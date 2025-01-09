/* eslint-disable no-unused-vars */
import { create } from "zustand";

export interface GameStore {
  allowPlay: boolean;
}

export interface GameActions {
  setAllowPlay: (allowPlay: boolean) => void;
}
const initGameStore = {
  allowPlay: false,
};

export const useGameStore = create<GameStore & GameActions>((set) => ({
  ...initGameStore,
  setAllowPlay: (allowPlay: boolean) => set({ allowPlay }),
}));

export const useAllowPlay = () => useGameStore((state) => state.allowPlay);

export const useSetAllowPlay = () =>
  useGameStore((state) => state.setAllowPlay);

export default useGameStore;
