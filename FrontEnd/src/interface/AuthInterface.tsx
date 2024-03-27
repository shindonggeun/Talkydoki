// 로그인 시 백엔드로 보낼 요청 데이터
export interface LoginParams {
  email: string;
  password: string;
}

// 회원가입 시 백엔드로 보낼 요청 데이터
export interface SignupParams {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

// 소셜로그인 param
export interface SocialLoginPayload {
  provider: string;
  code: string;
}

// 이미지 업로드 인자
export interface ImageUploadParams {
  file: File | null;
  nameFile: string;
}

// 프로필 수정 Params
export interface ProfileUpdateParams {
  profileImage: string | null;
  nickname: string;
}

export interface PasswordChangeParams {
  nowPassword: string;
  changePassword: string;
  changePasswordCheck: string;
}

// 이메일 인증 Params
export interface EmailVerifyPayload {
  email: string;
  code: string;
}
