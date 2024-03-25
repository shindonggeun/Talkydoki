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

  .info {
    font-size: 10pt;
    opacity: 0.8;
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
    justify-content: space-evenly;
  }

  @media screen and (max-width: 992px) {
    position: static;
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
      /* color: var(--main); */
    }
  }

  @media screen and (max-width: 992px) {
    width: calc(100vw - 10px);
  }
`;

export const ReadLineContainer = styled(WordContainer)`
  padding: 2vh 1vw;
  cursor: pointer;
  font-size: 14pt;

  .newscontent {
    display: flex;
    align-items: center;

    .playIcon {
      font-size: 40pt;
      cursor: pointer;
      opacity: 0.8;
      margin-right: 1vw;
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
      color: var(--main-dark);
    }
  }
`;

export const SpeechContainer = styled.div`
  margin: 4vh 0;
  padding: 2vh 3vw;
  width: 100%;
  backdrop-filter: brightness(1.5);
  border: 1px solid var(--shadow-dark);
`;
