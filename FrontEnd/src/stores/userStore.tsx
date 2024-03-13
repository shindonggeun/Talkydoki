import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  //함수 타입지정 매개변수도 타입지정 반환값없어서 void
  setIsLogin: (isLogin: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
}));
