import { Card } from "@/styles/common/ui/card";
import { Wrapper } from "@/styles/common/ui/container";
import styled from "styled-components";

export const NewsWrapper = styled(Wrapper)`
  display: flex;

  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
    justify-content: start;

    ${Card} {
      width: 100%;
    }
  }
`;

export const SummaryWrapper = styled.div`
  margin: 1vh 1vw;
  padding: 3vh 3vw;
  border: 1px solid var(--main);

  div {
    margin: 2vh 0;
    opacity: 0.5;
  }

  .jp {
    opacity: 1;
  }
`;

export const NewsArticleWrapper = styled(Card)`
  width: calc(100% - 300px);
  margin: 1vh 1vw;
  padding: 3vh 3.5vw 10vh 3.5vw;

  .koTitle {
    margin-bottom: 3vh;
    font-size: 14pt;
  }

  .jpTitle {
    font-size: 21pt;
    font-weight: 900;
    margin: 2vh 0;
  }

  .info {
    word-break: break-all;
    font-size: 10pt;
    opacity: 0.8;
    text-decoration: none;
    color: var(--text);
    &:hover,
    &:active {
      color: var(--main);
    }
  }

  @media screen and (max-width: 992px) {
    margin: 1vh 0;
  }
`;

export const NewsWidget = styled(Card)`
  position: fixed;
  width: 290px;
  margin: 1vh 1vw;
  padding: 4vh 1vw;
  height: fit-content;
  right: 0;
  top: 3vh;

  .title {
    padding: 2vh 1vw;
    text-align: center;
  }

  .keywordSection {
    display: flex;
    padding: 2vh 0;
    margin-bottom: 2vh;
    flex-wrap: wrap;
    justify-content: center;
  }

  .speedChanger {
    margin: 2vh 0;
  }

  @media screen and (max-width: 992px) {
    position: static;
    margin: 1vh 0;
    padding: 2vh 10px;
  }
`;

export const WordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3vh 0;

  &.isTitle {
    div.read,
    div.readKor {
      font-size: 12pt;
    }

    div.japanese {
      font-size: 22pt;
      font-weight: 900;
    }
  }

  &.playing {
    .japanese {
      color: var(--main);
      font-weight: 600;
    }
  }
`;

export const ArticleContainer = styled.div`
  width: 100%;
  padding: 5vh 2vw;

  .translation {
    background-color: var(--bg);
    border: 1px solid var(--shadow);
    color: ${(props) =>
      props.theme.mode == "light" ? "var(--grey-dark)" : "var(--grey-light)"};
    height: fit-content;
    margin: 2vh 1vw;
    padding: 20px;
    overflow: hidden;
    display: none;

    &.show {
      display: block;
    }
  }
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 50px;
  z-index: 10;
`;

export const WordSearchWrapper = styled.div`
  width: 350px;
  background-color: var(--bg-modal);
  border: 1px solid var(--grey);
  position: fixed;
  z-index: 9;
  padding: 2vh 2vw;
  border-top: 8px solid var(--main);
  box-shadow: 0 0 10px 5px var(--shadow);

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .jp {
      font-size: 36pt;
      font-weight: 900;
    }

    .addIcon {
      cursor: pointer;

      &:hover,
      &:active {
        color: var(--main);
      }

      &:active {
        transform: scale(0.9);
      }

      &.added {
        color: var(--main);
        animation: clickAnimation 0.3s ease;
        -webkit-animation: clickAnimation 0.3s ease;
      }
    }
  }

  @media screen and (max-width: 992px) {
    width: calc(100vw - 10px);
  }

  @-webkit-keyframes clickAnimation {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const ReadLineContainer = styled(WordContainer)`
  padding: 2vh 2vw;
  cursor: pointer;
  font-size: 14pt;

  .newscontent {
    display: flex;
    align-items: flex-start;
    padding: 1vh 1vw;

    .playIcon {
      font-size: 24pt;
      cursor: pointer;
      opacity: 0.8;
      margin: 1vh 1vw;
      margin-right: 2vw;
      display: none;

      &:hover {
        opacity: 1;
      }
    }
  }

  &:hover {
    border: 1px solid var(--main);

    &.selected {
      cursor: default;
    }
  }

  .jp {
    position: relative;
    cursor: pointer;

    .jpRead {
      display: none;
    }
  }

  &.selected {
    border: 1px solid var(--main);
    background-color: ${(props) =>
      props.theme.mode == "light"
        ? "rgb(from var(--main-light) r g b / 0.6)"
        : "rgb(from var(--main-dark) r g b / 0.3)"};
    .playIcon {
      display: block;
    }
    .playIcon,
    .jp {
      color: ${(props) =>
        props.theme.mode == "light" ? "var(--main-dark)" : "var(--main-light)"};

      .jpRead {
        display: none;
        position: absolute;
        left: 0;
        top: -30px;
        padding: 5px 10px;
        border-radius: 25px;
        width: max-content;
        font-size: 9pt;
        word-break: keep-all;
        color: var(--text-button);
        background-color: var(--blue-dark);
      }

      &:hover {
        .jpRead {
          display: block;
        }
      }
    }
  }
`;

export const SpeechContainer = styled.div`
  margin: 4vh 0;
  padding: 2vh 1vw;
  width: 100%;
  backdrop-filter: brightness(1.2) grayscale(0.2);
  -webkit-backdrop-filter: brightness(1.2) grayscale(0.2);

  border: 1px solid
    ${(props) =>
      props.theme.mode == "light" ? "var(--shadow)" : "var(--main)"};
  display: flex;

  .buttons {
    height: 100%;
  }

  .script {
    padding: 1vh 2vw;
    width: 100%;
    height: 100%;

    .msg {
      flex-grow: 1;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
    }
  }

  .similarity {
    height: 30px;
    color: ${(props) =>
      props.theme.mode == "light" ? "var(--main)" : "var(--yellow-dark)"};
  }

  .alert {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
  }

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;
