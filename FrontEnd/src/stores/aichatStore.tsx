import { create } from "zustand";
interface AiChatInterace {
  globalIsTranslate: boolean;
  setGlobalIsTranslate: () => void;
  globalIsFeadback: boolean;
  setglobalIsFeadback: () => void;
}

export const useAiChatStore = create<AiChatInterace>((set) => ({
  globalIsTranslate: false,
  setGlobalIsTranslate: () =>
    set((state) => ({ globalIsTranslate: !state.globalIsTranslate })),
  globalIsFeadback: false,
  setglobalIsFeadback: () =>
    set((state) => ({ globalIsFeadback: !state.globalIsFeadback })),
}));
