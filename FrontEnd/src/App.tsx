import { Global } from "@/styles/common/base";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Fonts } from "@/styles/common/fonts";
import { dark, light } from "@/styles/common/themes";
import { muiDarkTheme, muiTheme } from "./styles/common/muiTheme";
import { useIsDark } from "./stores/displayStore";
import { useIsModalOn } from "./stores/modalStore";

// route 컴포넌트
import Intro from "@/routes/Intro";
import Menu from "./routes/Menu";
import Modal from "./components/ui/Modal";
import Main from "./routes/Main";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import News from "./routes/News";
import Protected from "./components/Protect/Protect";
import { useAuthStore } from "./stores/userStore";

function App() {
  const isDark = useIsDark();
  const isModalOn = useIsModalOn();
  const isLogin = useAuthStore.getState().isLogin;

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <MUIThemeProvider theme={isDark ? muiDarkTheme : muiTheme}>
        <Fonts />
        <Global />
        {isLogin ? <Menu /> : null}
        {isModalOn ? <Modal /> : null}
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route
            path="/main"
            element={
              <Protected>
                <Main />
              </Protected>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default App;
