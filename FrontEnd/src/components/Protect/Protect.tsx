// components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/userStore";
import { useShallow } from "zustand/react/shallow";
import { getCookie } from "@/util/auth/userCookie";

// 로그인 필요 체크용 프로텍트라우터
const Protected = () => {
  const { isLogin, setIsLogin } = useAuthStore(
    useShallow((state) => ({
      isLogin: state.isLogin,
      setIsLogin: state.setIsLogin,
    }))
  );

  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    const accessToken = getCookie();
    if (accessToken != undefined) {
      setIsLogin(true);
      console.log(isLogin);
    } else {
      setIsLogin(false);
      console.log(isLogin);
    }
  }, [pathname]);

  // if (!accessToken) {
  //   setIsLogin(false);
  //   navigate("/login");
  // }
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
  return <></>;
};

export default Protected;
