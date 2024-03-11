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
        </Routes>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default App;
