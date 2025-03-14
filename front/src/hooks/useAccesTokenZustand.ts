import { create } from "zustand";

type AccessTokenType = {
  setAccessToken: (token: string) => void;
  getAccessToken: () => string;
  removeAccessToken: () => void;
} & TokenType;

const useAccesTokenZustand = create<AccessTokenType>((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || "",
  setAccessToken: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    set({ accessToken });
  },
  getAccessToken: () => "Bearer " + get().accessToken,
  removeAccessToken: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: "" });
  },
}));

export default useAccesTokenZustand;
