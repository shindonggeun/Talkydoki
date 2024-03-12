import { customAxios } from "../util/auth/customAxios";
import { LoginParams, SignupParams } from "../interface/AuthInterface";
import { useMutation, useQuery } from "@tanstack/react-query";

// 일반 로그인
export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginParams) =>
      customAxios.post(`/member/login`, payload),

    onSuccess: (res) => {
      console.log(res);
      const response = res.data;
      if (response.dataHeader.successCode === 0) {
        console.log("로그인 성공");
      } else {
        alert(response.dataHeader.resultMessage);
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
      const response = res.data;
      if (response.dataHeader.successCode === 0) {
        // 성공했을 때 로직 처리
      } else {
        alert(response.dataHeader.resultMessage);
      }
    },
    //실패 메세지 추가필요
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
