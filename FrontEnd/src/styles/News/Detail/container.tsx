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
  width: 300px;
  margin: 1vh 1vw;
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
  left: calc(50% - 200px);
  z-index: 10;
`;
