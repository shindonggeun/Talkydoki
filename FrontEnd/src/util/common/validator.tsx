import { SignupParams } from "@/interface/AuthInterface";

// 비밀번호==비밀번호 확인
export const isSamePassword = (password: string, password2: string) => {
  if (password.length == 0 && password2.length == 0) return true;
  if (password != password2) {
    return false;
  } else {
    return true;
  }
};

// 회원가입 유효성 검사 함수
export const isValidAuth = (
  form: SignupParams,
  password2: string,
  emailVerifyStatus: string
) => {
  const { email, name, nickname, password } = form;
  // 인증 받은 이메일 조건
  if (emailVerifyStatus !== "success") return false;

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

// 비밀번호 변경 시 유효성 검사
export const isValidPWChange = (
  oldpassword: string,
  password1: string,
  password2: string
) => {
  const pwCheck =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
  if (oldpassword.length == 0) return false;
  if (!isSamePassword(password1, password2)) return false;
  if (!pwCheck.test(password1)) return false;
  return true;
};

// 프로필 사진 등록 시 확장자 체크
export const isValidImage = (file: File) => {
  const imgRegex = /^(.+)[.jpg|.png|.jpeg]$/;
  return imgRegex.test(file.name);
};
