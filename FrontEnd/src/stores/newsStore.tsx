import { create } from "zustand";

interface NewsButtonProps {
  isPlayingEach: boolean; // 한줄씩 재생 중 여부
  isPlaying: boolean; // 재생 중 여부
  isTransOn: boolean; // 번역 켰는 지
  isReadOn: boolean; // 발음(일) 켰는 지
  isReadKrOn: boolean; // 발음(한) 켰는 지
  isTTSReady: boolean; // TTS 로딩 완료 여부
  actions: {
    setIsPlayingEach: (by: boolean) => void;
    setIsPlaying: (by: boolean) => void;
    setIsTransOn: (by: boolean) => void;
    setIsReadOn: (by: boolean) => void;
    setIsReadKrOn: (by: boolean) => void;
    setIsTTSReady: (by: boolean) => void;
  };
}

// 뉴스 읽기모드 버튼그룹 스토어
const useNewsButtonStore = create<NewsButtonProps>((set) => ({
  isPlayingEach: false,
  isPlaying: false,
  isTransOn: false,
  isReadOn: false,
  isReadKrOn: false,
  isTTSReady: false,
  actions: {
    setIsPlayingEach: (by) => set(() => ({ isPlayingEach: by })),
    setIsPlaying: (by) => set(() => ({ isPlaying: by })),
    setIsTransOn: (by) => set(() => ({ isTransOn: by })),
    setIsReadOn: (by) => set(() => ({ isReadOn: by })),
    setIsReadKrOn: (by) => set(() => ({ isReadKrOn: by })),
    setIsTTSReady: (by) => set(() => ({ isTTSReady: by })),
  },
}));

export const useIsPlaying = () =>
  useNewsButtonStore((state) => ({
    isPlaying: state.isPlaying,
    isPlayingEach: state.isPlayingEach,
  }));

export const useButtonStates = () =>
  useNewsButtonStore((state) => ({
    isPlaying: state.isPlaying,
    isTransOn: state.isTransOn,
    isReadOn: state.isReadOn,
    isReadKrOn: state.isReadKrOn,
    isTTSReady: state.isTTSReady,
  }));

export const useButtonActions = () =>
  useNewsButtonStore((state) => state.actions);

// 뉴스 재생 속도
interface NewsSpeed {
  speed: number;
  setSpeed: (by: number) => void;
}

const useNewsSpeedStore = create<NewsSpeed>((set) => ({
  speed: 1,
  setSpeed: (by) => set(() => ({ speed: by })),
}));

export const useNewsSpeed = () => useNewsSpeedStore((state) => state.speed);
export const useSetNewsSpeed = () =>
  useNewsSpeedStore((state) => state.setSpeed);

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
  setIsSearchOn: (by) => {
    return set(() => ({ isSearchOn: by }));
  },
}));

export const useSearchWord = () => useSearchStore((state) => state.word);
export const useSetSearchWord = () => useSearchStore((state) => state.setWord);
export const useIsSearchOn = () => useSearchStore((state) => state.isSearchOn);
export const useSetIsSearchOn = () =>
  useSearchStore((state) => state.setIsSearchOn);
