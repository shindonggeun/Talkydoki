// components/ProtectedRoute.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useAuthStore } from "@/stores/userStore";

interface ProtectedRouteProps {
  children: JSX.Element;
}

// 로그인 필요 체크용 프로텍트라우터
const Protected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogin, setIsLogin } = useAuthStore();
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const navigate = useNavigate();

  if (!accessToken) {
    setIsLogin(false);
    navigate("/login");
  }
  //   else {

  //     // useQuery('refreshToken', refreshToken, {
  //     //     enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
  //     //     refetchInterval: 15 * 60 * 1000, // 15분마다 토큰 갱신 시도
  //     //     refetchIntervalInBackground: true, // 백그라운드에서도 실행
  //     //   });
  //   }
  //    1.첫번째로 쿠키에 있는 어쎄스 토큰 확인
  //   if (!accessToken) {
  //     // 2. 액세스 토큰이 쿠키에 없으면, 리프레시 토큰 확인
  //     const refreshToken = localStorage.getItem("refreshToken");
  //          리프레쉬 토큰 확인 구역
  //     if (refreshToken) {
  //       // 리프레쉬 토큰 있다면 백엔드에 액세스 토큰 갱신 요청
  //       axios
  //         .post("/api/auth/refresh", { refreshToken })
  //         .then((response) => {
  //           const { accessToken } = response.data;
  //           Cookies.set("accessToken", accessToken);
  //           setIsLogin(true);
  //           // 갱신된 토큰으로 페이지 유지
  //         })
  //         .catch(() => {
  //           setIsLogin(false);
  //           return <Navigate to="/login" replace />;
  //         });
  //     } else { 없는 경우 전역 로그인 false 처리후 로그인으로 유도
  //       setIsLogin(false);
  //       return <Navigate to="/login" replace />;
  //     }
  //   }

  // 로그인 상태가 true이면 자식 컴포넌트 렌더링
  return isLogin ? children : <></>;
};

export default Protected;
