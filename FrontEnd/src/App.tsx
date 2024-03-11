import React from "react";
import { Global } from "@/styles/common/base";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Fonts } from "@/styles/common/fonts";
import { dark, light } from "@/styles/common/themes";
import { muiTheme } from "./styles/common/muiTheme";
import { Container } from "./styles/ui/container";

// route 컴포넌트
import Intro from "@/routes/Intro";

function App() {
  return (
    <ThemeProvider theme={light}>
      <MUIThemeProvider theme={muiTheme}>
        <Fonts />
        <Global />
        <Container>
          <Routes>
            <Route path="/" element={<Intro />} />
          </Routes>
        </Container>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default App;
