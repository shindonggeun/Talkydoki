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

  useEffect(() => {
    const accessToken = getCookie();
    if (accessToken != undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      console.log(isLogin);
    }
  }, [pathname]);

  return <></>;
};

export default Protected;
