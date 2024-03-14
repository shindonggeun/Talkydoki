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
        --text-button: ${props.theme.doc.textButton};
        --bg: ${props.theme.doc.background};
        --bg-modal: ${props.theme.doc.backgroundModal};
        --shadow: ${props.theme.doc.shadow};
        --shadow-dark :${props.theme.doc.shadowDark};
        `}

        /* 아이콘 클릭 시 줄어들었다가 커지는 애니메이션 */
        @keyframes iconAnimation {
          0% {
            transform: scale(1);
          }
          10% {
            transform: scale(0.5);
          }
          60% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
    }

    body, html {
      margin: 0;
      background-color: var(--bg);
      font-family: 'ScoreDream', 'Mplus';
      overflow-x: hidden;

    }

    body, html, div, span, button, form, section {
      box-sizing: border-box;
      color: var(--text);

      &::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--main-light);
        border-radius: 50px;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }

`;
