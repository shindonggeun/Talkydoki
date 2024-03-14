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
