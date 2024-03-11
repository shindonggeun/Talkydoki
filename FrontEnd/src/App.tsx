import React from "react";
import { Global } from "@/styles/common/base";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Fonts } from "@/styles/common/fonts";
import { dark, light } from "@/styles/common/themes";
import { muiTheme } from "./styles/common/muiTheme";

// route 컴포넌트
import Intro from "@/routes/Intro";
import LoginPage from "./routes/user/LoginPage";
import SignUpPage from "./routes/user/SignUpPage";

function App() {
  return (
    <ThemeProvider theme={light}>
      <MUIThemeProvider theme={muiTheme}>
        <Fonts />
        <Global />
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
