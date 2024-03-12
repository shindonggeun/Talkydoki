import { Global } from "@/styles/common/base";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Fonts } from "@/styles/common/fonts";
import { dark, light } from "@/styles/common/themes";
import { muiTheme } from "./styles/common/muiTheme";
import { useIsDark } from "./stores/displayStore";
import { useIsModalOn } from "./stores/modalStore";

// route 컴포넌트
import Intro from "@/routes/Intro";
import Menu from "./routes/Menu";
import Modal from "./components/ui/Modal";
import LoginPage from "./routes/user/LoginPage";
import SignUpPage from "./routes/user/SignUpPage";

function App() {
  const isDark = useIsDark();
  const isModalOn = useIsModalOn();

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <MUIThemeProvider theme={muiTheme}>
        <Fonts />
        <Global />
        <Menu />
        {isModalOn ? <Modal /> : null}
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default App;
