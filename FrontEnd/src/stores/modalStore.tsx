import { create } from "zustand";

interface ModalInterface {
  isModalOn: boolean;
  setIsModalOn: (on: boolean) => void;
  modalContent: {
    message: string;
    onSuccess: () => void;
    isInfo: boolean;
  };
  setModalContent: (newContent: {
    message: string;
    onSuccess?: () => void;
    isInfo: boolean;
  }) => void;
}

const useModalStore = create<ModalInterface>((set) => ({
  // 모달 활성화 여부
  isModalOn: false,

  // 모달 활성화 토글 (true, false 받음)
  setIsModalOn: (on) => set(() => ({ isModalOn: on })),

  // 모달 내용물 (message: 메세지, onSuccess: 확인 눌렀을 경우 실행할 함수, isInfo: 정보 안내용 팝업인지?)
  modalContent: { message: "", onSuccess: () => {}, isInfo: false },

  // 모달 내용물 set 함수
  setModalContent: (newContent) =>
    set(() => ({
      modalContent: {
        message: newContent.message,
        onSuccess:
          newContent.onSuccess != undefined ? newContent.onSuccess : () => {},
        isInfo: newContent.isInfo,
      },
    })),
}));

export const useIsModalOn = () => useModalStore((state) => state.isModalOn);
export const useSetISModalOn = () =>
  useModalStore((state) => state.setIsModalOn);

export const useModalContent = () =>
  useModalStore((state) => state.modalContent);
export const useSetModalContent = () =>
  useModalStore((state) => state.setModalContent);
