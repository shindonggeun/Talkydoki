import { Card } from "@/styles/common/ui/card";
import { Wrapper } from "@/styles/common/ui/container";
import styled from "styled-components";
import { WordItem } from "./ui";

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

export const NewsArticleWrapper = styled(Card)`
  width: calc(100% - 300px);
  margin: 1vh 1vw;

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

  &.isTitle {
    margin: 2vh 0;

    div.read,
    div.readKor {
      font-size: 12pt;
    }

    div.japanese {
      font-size: 22pt;
      font-weight: 900;
    }
  }
`;

export const ArticleContainer = styled.div`
  width: 100%;
  padding: 5vh 2vw;
`;
