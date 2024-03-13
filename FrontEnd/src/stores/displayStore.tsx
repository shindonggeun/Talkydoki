import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 다크모드

interface DarkModeInterface {
  isDark: boolean;
  setIsDark: () => void;
}

const useDarkModeStore = create(
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

export const useIsDark = () => useDarkModeStore((state) => state.isDark);
export const useDisplayAction = () =>
  useDarkModeStore((state) => state.setIsDark);

// 반응형 사이드바 토글

interface NavBarInterface {
  isSidebarOpen: boolean;
  setisSidebarOpen: (open: boolean) => void;
}

const useSideBarStore = create<NavBarInterface>((set) => ({
  isSidebarOpen: window.innerWidth < 992 ? false : true,
  setisSidebarOpen: (open) => set(() => ({ isSidebarOpen: open })),
}));

export const useIsSidebarOpen = () =>
  useSideBarStore((state) => state.isSidebarOpen);
export const useSetIsSidebarOpen = () =>
  useSideBarStore((state) => state.setisSidebarOpen);

// 모바일 환경인 지 (* <992px) 확인하는 Store

interface MobileInterface {
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

const useMobileStore = create<MobileInterface>((set) => ({
  isMobile: window.innerWidth < 992 ? true : false,
  setIsMobile: (mobile) =>
    set(() => ({
      isMobile: mobile,
    })),
}));

export const useIsMobile = () => useMobileStore((state) => state.isMobile);
export const useSetIsMobile = () =>
  useMobileStore((state) => state.setIsMobile);
