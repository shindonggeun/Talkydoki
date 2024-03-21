import { create } from "zustand";
interface AiChatInterace {
  globalIsTranslate: boolean;
  setGlobalIsTranslate: () => void;
}

export const useAiChatStore = create<AiChatInterace>((set) => ({
  globalIsTranslate: false,
  setGlobalIsTranslate: () =>
    set((state) => ({ globalIsTranslate: !state.globalIsTranslate })),
}));
