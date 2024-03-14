import { SignupParams } from "@/interface/AuthInterface";

export const isSamePassword = (password: string, password2: string) => {
  if (password.length == 0 && password2.length == 0) return true;
  if (password != password2) {
    return false;
  } else {
    return true;
  }
};

export const isValidAuth = (form: SignupParams, password2: string) => {
  const { email, name, nickname, password } = form;

  // 이메일 및 비밀번호 확인 정규식
  const emailCheck = /^[a-zA-Z0-9+-/_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const pwCheck =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  // 비밀번호-비밀번호 확인 다르면 false
  if (
    !isSamePassword(password, password2) ||
    name.length == 0 ||
    nickname.length == 0
  )
    return false;

  // 비밀번호 및 이메일 형식 안맞으면 false
  if (!emailCheck.test(email)) return false;
  if (!pwCheck.test(password)) return false;

  return true;
};
