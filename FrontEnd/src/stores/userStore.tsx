import { getCookie } from "@/util/auth/userCookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  //함수 타입지정 매개변수도 타입지정 반환값없어서 void
  setIsLogin: (isLogin: boolean) => void;
  memberEmail: string;
  setMemberEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // isLogin: false,
  isLogin: getCookie() == undefined ? false : true,
  setIsLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
  memberEmail: "",
  setMemberEmail: (email) => set(() => ({ memberEmail: email })),
}));

export const useIsLogin = () => useAuthStore((state) => state.isLogin);
export const useSetIsLogin = () => useAuthStore((state) => state.setIsLogin);

interface EmailStoreInterface {
  email: string;
  setEmail: (email: string) => void;
}

const useEmailStore = create(
  persist<EmailStoreInterface>(
    (set) => ({
      email: "",
      setEmail: (email) => set(() => ({ email: email })),
    }),
    {
      name: "email",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useMemberEmail = () => useEmailStore((state) => state.email);
export const useSetMemberEmail = () => useEmailStore((state) => state.setEmail);
