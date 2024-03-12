import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 다크모드

interface DarkModeInterface {
  isDark: boolean;
  setIsDark: () => void;
}

const useDarkMode = create(
  persist<DarkModeInterface>(
    (set) => ({
      isDark: false,
      setIsDark: () =>
        set((state) => ({
          isDark: !state.isDark,
        })),
    }),
    {
      name: "display",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useIsDark = () => useDarkMode((state) => state.isDark);
export const useDisplayAction = () => useDarkMode((state) => state.setIsDark);

// 반응형 사이드바 토글

interface NavBarInterface {
  isSidebarOpen: boolean;
  setisSidebarOpen: (open: boolean) => void;
}

const useSideBar = create<NavBarInterface>((set) => ({
  isSidebarOpen: window.innerWidth < 992 ? false : true,
  setisSidebarOpen: (open) => set(() => ({ isSidebarOpen: open })),
}));

export const useIsSidebarOpen = () =>
  useSideBar((state) => state.isSidebarOpen);
export const useSetIsSidebarOpen = () =>
  useSideBar((state) => state.setisSidebarOpen);

// 모바일 환경인 지 (* <992px) 확인하는 Store

interface MobileInterface {
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

const useMobile = create<MobileInterface>((set) => ({
  isMobile: window.innerWidth < 992 ? true : false,
  setIsMobile: (mobile) =>
    set(() => ({
      isMobile: mobile,
    })),
}));

export const useIsMobile = () => useMobile((state) => state.isMobile);
export const useSetIsMobile = () => useMobile((state) => state.setIsMobile);
