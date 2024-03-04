import { local } from "../util/http-commons";

// 로그인 시 백엔드로 보낼 요청 데이터
interface LoginParams {
  email: string;
  password: string;
}

// 회원가입 시 백엔드로 보낼 요청 데이터
interface SignupParams {
  email: string;
  password: string;
  name: string;
}

// 일반 로그인
async function memberLoginApi(param: LoginParams) {
  return local.post(`/member/login`, param);
}

// 일반 회원가입
async function memberSignUpApi(param: SignupParams) {
  return await local.post(`/member/signup`, param);
}

// 회원정보 가져오기
async function memberGetApi() {
    return await local.get(`/member/get`);
}

export { 
    memberLoginApi, 
    memberSignUpApi, 
    memberGetApi 
};
