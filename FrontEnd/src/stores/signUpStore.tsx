import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface signUpErrorInterface {
  nameError: null | string;
  nicknameError: null | string;
  passwordError: null | string;
  emailError: null | string;
  setErrors: (errors: {
    nameError?: string;
    nicknameError?: string;
    passwordError?: string;
    emailError?: string;
  }) => void;
}

const useSignupStore = create<signUpErrorInterface>((set) => ({
  nameError: null,
  nicknameError: null,
  passwordError: null,
  emailError: null,

  setErrors: (errors) =>
    set(() => ({
      nameError: errors.nameError ? errors.nameError : null,
      nicknameError: errors.nicknameError ? errors.nicknameError : null,
      passwordError: errors.passwordError ? errors.passwordError : null,
      emailError: errors.emailError ? errors.emailError : null,
    })),
}));

export const useSetSignupErrors = () =>
  useSignupStore((state) => state.setErrors);

export const useSignupErrors = () =>
  useSignupStore(
    useShallow((state) => ({
      nameError: state.nameError,
      nicknameError: state.nicknameError,
      passwordError: state.passwordError,
      emailError: state.emailError,
    }))
  );

// 비밀번호 변경 유효성 오류 처리
interface pwChangeInterface {
  changePasswordCheckError: null | string;
  changePasswordError: null | string;
  setErrors: (errors: {
    changePasswordCheckError?: string;
    changePasswordError?: string;
  }) => void;
}


const usePWChangeStore = create<pwChangeInterface>((set) => ({
  changePasswordCheckError: null,
  changePasswordError: null,

  setErrors: (errors) =>
    set(() => ({
      changePasswordCheckError: errors.changePasswordCheckError
        ? errors.changePasswordCheckError
        : null,
      changePasswordError: errors.changePasswordError
        ? errors.changePasswordError
        : null,
    })),
}));

export const useSetPasswordErrors = () =>
  usePWChangeStore((state) => state.setErrors);

export const usePasswordErrors = () =>
  usePWChangeStore(
    useShallow((state) => ({
      changePasswordCheckError: state.changePasswordCheckError,
      changePasswordError: state.changePasswordError,
    }))
  );
