import { create } from "zustand";

interface profImgInterface {
  profImg: string;
  setProfImg: (newImg: string) => void;
}

const useProfileUpdateStore = create<profImgInterface>((set) => ({
  profImg: "",
  setProfImg: (newImg) => set(() => ({ profImg: newImg })),
}));

export const useProfImg = () => useProfileUpdateStore((state) => state.profImg);
export const useSetProfImg = () =>
  useProfileUpdateStore((state) => state.setProfImg);
