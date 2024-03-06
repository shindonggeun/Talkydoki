import { customAxios } from "../util/auth/customAxios";
import { LoginParams, SignupParams } from "../interface/AuthInterface";
import { useMutation, useQuery } from "@tanstack/react-query";

// 일반 로그인
export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginParams) =>
      customAxios.post(`/member/login`, payload),

    onSuccess: (res) => {
      if (res.status == 200) {
        // 로그인 성공 시 (추후 추가)
      } else {
        // 로그인 실패 시
        for (const err of Object.keys(res.data)) {
          console.log(res.data[err][0]);
        }
      }
    },

    onError: (err) => console.error(err),
  });
};

// 일반 회원가입
export const useSignup = () => {
  return useMutation({
    mutationFn: (payload: SignupParams) =>
      customAxios.post(`/member/signup`, payload),

    onSuccess: (res) => {
      if (res.status == 200) {
        // 회원가입 성공 시 (추후 추가)
      } else {
        // 회원가입 실패 시
        for (const err of Object.keys(res.data)) {
          console.log(res.data[err][0]);
        }
      }
    },

    onError: (err) => console.error(err),
  });
};

// 회원정보 가져오기
export const useGetMember = () => {
  return useQuery({
    queryKey: ["getMember"],
    queryFn: () => customAxios.get(`/member/get`),
    select: (res) => res.data,
    staleTime: Infinity, // 유저 정보 새로 가져오는 타이밍 (현재 무기한 연기)
  });
};
