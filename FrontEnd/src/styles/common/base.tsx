import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    :root {
      ${(props) =>
        `--main: ${props.theme.main.color};
        --main-light: ${props.theme.main.light};
        --main-dark: ${props.theme.main.dark};
        --grey: ${props.theme.grey.color};
        --grey-light: ${props.theme.grey.light};
        --grey-dark: ${props.theme.grey.dark};
        --green: ${props.theme.green.color};
        --green-light: ${props.theme.green.light};
        --green-dark: ${props.theme.green.dark};
        --red: ${props.theme.red.color};
        --red-light: ${props.theme.red.light};
        --red-dark: ${props.theme.red.dark};
        --yellow: ${props.theme.yellow.color};
        --yellow-light: ${props.theme.yellow.light};
        --yellow-dark: ${props.theme.yellow.dark};
        --blue: ${props.theme.blue.color};
        --blue-light: ${props.theme.blue.light};
        --blue-dark: ${props.theme.blue.dark};
        --text: ${props.theme.doc.text};
        --bg: ${props.theme.doc.background};
        --bg-modal: ${props.theme.doc.backgroundModal};
        --shadow: ${props.theme.doc.shadow};
        --shadow-dark :${props.theme.doc.shadowDark};
        `}
    }

    body, html {
      margin: 0;
      background-color: var(--bg);
      font-family: 'ScoreDream', 'Mplus';
    }

    body, html, div, span, button, form {
      box-sizing: border-box;
      color: var(--text);
    }

    h1.title {
      width: fit-content;
      color: transparent;
      background: radial-gradient(farthest-corner, var(--shadow), var(--shadow-dark));
      background-clip: text;
      font-weight: 900;
    }
`;
