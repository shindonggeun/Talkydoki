import { customAxios } from "../util/auth/customAxios";
import { LoginParams, SignupParams } from "../interface/AuthInterface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/userStore";

// 일반 로그인
export const useLogin = () => {
  const navigate = useNavigate();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  // 로그인시 되는지 전역 확인용 후에 삭제 예정
  const isLogin = useAuthStore((state) => state.isLogin);

  return useMutation({
    mutationFn: (payload: LoginParams) =>
      customAxios.post(`/member/login`, payload),

    onSuccess: (res) => {
      console.log(res);
      const response = res.data;
      if (response.dataHeader.successCode === 0) {
        console.log("로그인 성공");
        console.log("전역 로그인 확인", isLogin);

        setIsLogin(true);
        navigate(`/`);
      } else {
        alert(response.dataHeader.resultMessage);
      }
    },

    onError: (err) => console.error(err),
  });
};

// 일반 회원가입
export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: SignupParams) =>
      customAxios.post(`/member/signup`, payload),

    onSuccess: (res) => {
      const response = res.data;
      if (response.dataHeader.successCode === 0) {
        // 성공했을 때 로직 처리
        console.log("회원가입 성공!!");
        navigate("/login");
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
    gcTime: Infinity,
  });
};
