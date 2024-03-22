import { create } from "zustand";

interface NewsButtonProps {
  isPlaying: boolean;
  isTransOn: boolean;
  isReadOn: boolean;
  isReadKrOn: boolean;
  actions: {
    setIsPlaying: (by: boolean) => void;
    setIsTransOn: (by: boolean) => void;
    setIsReadOn: (by: boolean) => void;
    setIsReadKrOn: (by: boolean) => void;
  };
}

// 뉴스 읽기모드 버튼그룹 스토어
const useNewsButtonStore = create<NewsButtonProps>((set) => ({
  isPlaying: false,
  isTransOn: false,
  isReadOn: false,
  isReadKrOn: false,
  actions: {
    setIsPlaying: (by) => set(() => ({ isPlaying: by })),
    setIsTransOn: (by) => set(() => ({ isTransOn: by })),
    setIsReadOn: (by) => set(() => ({ isReadOn: by })),
    setIsReadKrOn: (by) => set(() => ({ isReadKrOn: by })),
  },
}));

export const useButtonStates = () =>
  useNewsButtonStore((state) => ({
    isPlaying: state.isPlaying,
    isTransOn: state.isTransOn,
    isReadOn: state.isReadOn,
    isReadKrOn: state.isReadKrOn,
  }));

export const useButtonActions = () =>
  useNewsButtonStore((state) => state.actions);

// 단어 검색

interface WordSearchInterface {
  word: { word: string; read: string; x: number; y: number };
  setWord: (by: { word: string; read: string; x: number; y: number }) => void;
  isSearchOn: boolean;
  setIsSearchOn: (by: boolean) => void;
}

const useSearchStore = create<WordSearchInterface>((set) => ({
  word: { word: "", read: "", x: 0, y: 0 },
  setWord: (by) => set(() => ({ word: by })),
  isSearchOn: false,
  setIsSearchOn: (by) => set(() => ({ isSearchOn: by })),
}));

export const useSearchWord = () => useSearchStore((state) => state.word);
export const useSetSearchWord = () => useSearchStore((state) => state.setWord);
export const useIsSearchOn = () => useSearchStore((state) => state.isSearchOn);
export const useSetIsSearchOn = () =>
  useSearchStore((state) => state.setIsSearchOn);
