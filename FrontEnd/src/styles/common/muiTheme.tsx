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
  interface FormControlPropsColorOverrides {
    purple: true;
  }
  interface SwitchPropsColorOverrides {
    purple: true;
  }
  interface CircularProgressPropsColorOverrides {
    purple: true;
  }
  interface TabsPropsIndicatorColorOverrides {
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
  components: {
    MuiSwitch: {
      styleOverrides: {
        colorPrimary: {
          "&.Mui-checked": {
            color: light.main.dark,
          },
        },
        thumb: {
          backgroundColor: light.main.dark,
        },
        track: {
          backgroundColor: "#312a3d",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: light.main.color,
          },
        },
      },
    },
  },
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
  components: {
    MuiSwitch: {
      styleOverrides: {
        colorPrimary: {
          "&.Mui-checked": {
            color: dark.main.color,
          },
        },
        thumb: {
          backgroundColor: dark.main.color,
        },
        track: {
          backgroundColor: dark.doc.textButton,
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: dark.main.color,
          },
        },
      },
    },
  },
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
