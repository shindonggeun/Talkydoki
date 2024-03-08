import React from "react";
import { Global } from "@/styles/common/base";
import { ThemeProvider } from "styled-components";
import { dark, light } from "@/styles/common/themes";
import { Route, Routes } from "react-router-dom";
import { Fonts } from "@/styles/common/fonts";

// route 컴포넌트
import Intro from "@/routes/Intro";

function App() {
  return (
    <ThemeProvider theme={light}>
      <Fonts />
      <Global />
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
