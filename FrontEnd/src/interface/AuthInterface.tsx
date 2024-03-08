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
