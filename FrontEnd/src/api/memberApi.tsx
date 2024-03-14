import { customAxios } from "../util/auth/customAxios";
import { LoginParams, SignupParams } from "../interface/AuthInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useIsLogin } from "@/stores/userStore";

import { UserInterface } from "@/interface/UserInterface";
import { useSetSignupErrors } from "@/stores/signUpStore";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";

// 일반 로그인
export const useLogin = () => {
  const navigate = useNavigate();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  // 로그인시 되는지 전역 확인용 후에 삭제 예정
  const isLogin = useAuthStore((state) => state.isLogin);
  const queryClient = useQueryClient();

  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();

  return useMutation({
    mutationFn: (payload: LoginParams) =>
      customAxios.post(`/member/login`, payload),

    onSuccess: (res) => {
      // console.log(res);
      const { data } = res;
      if (data.dataHeader.successCode === 0) {
        console.log("로그인 성공");
        console.log("전역 로그인 확인", isLogin);
        // 로그인 후 return 받은 데이터 getMember 쿼리에 저장
        queryClient.setQueryData(
          ["getMember"],
          res.data.dataBody as UserInterface
        );
        setIsLogin(true);
        navigate(`/`);
      } else {
        setModalContent({
          message: data.dataHeader.resultMessage,
          isInfo: true,
        });
        setIsModalOn(true);
      }
    },

    onError: (err) => console.error(err),
  });
};

// 일반 회원가입
export const useSignup = () => {
  const navigate = useNavigate();
  const setErrors = useSetSignupErrors();

  return useMutation({
    mutationFn: (payload: SignupParams) =>
      customAxios.post(`/member/signup`, payload),

    onSuccess: (res) => {
      const { data } = res;
      if (data.dataHeader.successCode === 0) {
        // 성공했을 때 로직 처리
        console.log("회원가입 성공!!");
        navigate("/login");
      } else {
        if (data.dataHeader.resultCode) {
          setErrors(data.dataHeader.resultMessage);
        } else {
          setErrors({ emailError: "이미 가입되어 있는 이메일입니다." });
        }
      }
    },
    //실패 메세지 추가필요
    onError: (err) => console.error(err),
  });
};

// 회원정보 가져오기
export const useGetMember = () => {
  const isLogin = useIsLogin();

  return useQuery({
    queryKey: ["getMember"],
    queryFn: () => customAxios.get(`/member/get`).then((res) => res.data),
    select: (data) => {
      // get 성공 시 data.dataBody를 getMember로 쿼리에 저장
      if (data.dataHeader.successCode == 0) {
        return data.dataBody as UserInterface;
      } else {
        return null;
      }
    },
    enabled: isLogin, // 로그인 시에만 동작
    staleTime: Infinity, // 유저 정보 새로 가져오는 타이밍 (현재 무기한 연기)
    gcTime: Infinity,
  });
};

// 로그아웃 구현하기

export const useLogout = () => {
  const navigate = useNavigate();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  return useMutation({
    mutationFn: () => customAxios.post(`/member/logout`),

    onSuccess: (res) => {
      const response = res.data;
      if (response.dataHeader.successCode === 0) {
        console.log(`로그아웃 성공`);
        navigate("/intro");
        setIsLogin(false);
      } else {
        console.log("로그아웃실패");
      }
    },
    onError: (err) => console.error(err),
  });
};
