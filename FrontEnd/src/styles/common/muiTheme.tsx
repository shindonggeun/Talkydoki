import { createTheme } from "@mui/material";
import { light, dark } from "./themes";
import { ThemeOptions, Theme } from "@mui/material";

// Mui 커스텀 테마

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    purple: true;
  }
  interface TextFieldPropsColorOverrides {
    purple: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    purple: Palette["primary"];
  }
  interface PaletteOptions {
    purple: PaletteOptions["primary"];
  }
  export function createTheme(options: ThemeOptions): Theme;
}

// 라이트모드
export const muiTheme = createTheme({
  palette: {
    purple: {
      main: light.main.dark,
      contrastText: "#fff",
      dark: "#5027f1",
    },
    divider: light.doc.shadowDark,
  },
});

// 다크모드
export const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    purple: {
      main: dark.main.color,
      contrastText: "#fff",
      dark: dark.main.dark,
    },
    divider: dark.doc.shadowDark,
  },
});
