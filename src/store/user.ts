/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@/types/user";
import { Token } from "@prisma/client";
import { create } from "zustand";

export interface UserStore {
  user: User | null;
  accessToken: string | null;
  token: Token;
}

export interface UserActions {
  updateUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  setToken: (token: Token) => void;
  reset: () => void;
}

const initStore = {
  user: null,
  accessToken: null,
  token: "solana" as Token,
};

export const useUserStore = create<UserStore & UserActions>((set) => ({
  ...initStore,
  updateUser: (user: User) => set({ user }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setToken: (token: Token) => set({ token }),
  reset: () => set(initStore),
}));

export const useAccessToken = () => useUserStore((state) => state.accessToken);

export const useUser = () => useUserStore((state) => state.user);

export const useUpdateUser = () => useUserStore((state) => state.updateUser);

export const useUserActions = () => ({
  updateUser: useUpdateUser(),
  setAccessToken: useUserStore((state) => state.setAccessToken),
  reset: useUserStore((state) => state.reset),
});

export const useUserState = () => useUserStore((state) => state);

export const useToken = () => useUserStore((state) => state.token);

export const useSetToken = () => useUserStore((state) => state.setToken);

export default useUserStore;
