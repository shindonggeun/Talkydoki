import { create } from "zustand";
interface AiChatInterace {
  globalIsTranslate: boolean;
  setGlobalIsTranslate: () => void;
  globalIsTip: boolean;
  setGlobalIstip: () => void;
}

export const useAiChatStore = create<AiChatInterace>((set) => ({
  globalIsTranslate: true,
  setGlobalIsTranslate: () =>
    set((state) => ({ globalIsTranslate: !state.globalIsTranslate })),
  globalIsTip: true,
  setGlobalIstip: () => set((state) => ({ globalIsTip: !state.globalIsTip })),
}));
