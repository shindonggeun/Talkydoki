import "regenerator-runtime/runtime";

import { Global } from "@/styles/common/base";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { Fonts } from "@/styles/common/fonts";
import { dark, light } from "@/styles/common/themes";
import { muiDarkTheme, muiTheme } from "./styles/common/muiTheme";
import { useIsDark } from "@/stores/displayStore";
import { useIsModalOn } from "@/stores/modalStore";
import { useAuthStore } from "@/stores/userStore";
import Protected from "./components/Protect/Protect";

// route 컴포넌트
import Intro from "@/routes/Intro";
import Menu from "@/routes/Menu";
import Modal from "./components/ui/Modal";
import Main from "@/routes/Main";
import SignUp from "@/routes/SignUp";
import Login from "@/routes/Login";
import News from "@/routes/News";
import AiChatList from "./routes/AiChatList";
import SocialLoading from "./routes/SocialLoading";
import AiChatRoom from "./routes/AiChatRoom";
import MyPage from "./routes/MyPage";

// 마이페이지 내부 링크
import MyVoca from "./components/MyPage/MyVoca/MyVoca";
import ProfileUpdate from "@/routes/ProfileUpdate";
import NewsDetail from "./routes/NewsDetail";

function App() {
  const isDark = useIsDark();
  const isModalOn = useIsModalOn();
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <MUIThemeProvider theme={isDark ? muiDarkTheme : muiTheme}>
        <Fonts />
        <Global />

        <Protected />
        {isModalOn ? <Modal /> : null}
        {isLogin ? (
          <>
            <Menu />
            <Routes>
              <Route path="/" element={<Navigate replace to="/main" />} />
              <Route path="/main" element={<Main />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/detail" element={<NewsDetail />} />
              <Route path="/aichatlist" element={<AiChatList />} />
              <Route path="/aichatroom" element={<AiChatRoom />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/myvoca" element={<MyVoca />} />
              <Route path="/mypage/update" element={<ProfileUpdate />} />
              <Route path="/*" element={<Navigate replace to="/main" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate replace to="/intro" />} />
            <Route
              path="/member/loading/:provider"
              element={<SocialLoading />}
            />
            <Route path="/intro" element={<Intro />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate replace to="/login" />} />
          </Routes>
        )}
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default App;
