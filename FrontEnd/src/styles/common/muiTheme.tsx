import { createTheme } from "@mui/material";
import { light } from "./themes";
import { ThemeOptions, Theme } from "@mui/material";

// Mui 커스텀 테마

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
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
