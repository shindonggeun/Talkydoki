import styled from "styled-components";
import { NegativeTitle } from "../common/ui/text";
import { AiChatCard, Card } from "../common/ui/card";

export const Flexbox = styled.div`
  width: 100%;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 3vh 3vw;

  .titleBox {
    width: calc(100% - 3vw);
    height: 10%;
    margin: 2vh 1.5vw;
  }

  .Categorybox {
  }
`;

export const NegativeTiTle = styled(NegativeTitle)`
  margin: 0;
`;

export const Categorybox = styled.div`
  .titleBox {
    width: 100%;
    height: 10%;
    margin: 2vh 0;
    font-size: 20pt;
    font-weight: 500;
  }

  width: calc(100% - 3vw);
  margin: 1vh 1.5vw;
  height: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${AiChatCard} {
    margin: 10px 0;
    width: 30%;
  }
  @media screen and (max-width: 992px) {
    width: 100%;
    margin: 0;

    ${AiChatCard} {
      width: calc(50% - 3vw);
    }
  }
`;

export const AiCatagoryCard = styled(Card)`
  width: 28.5%;
  max-height: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;

  .inner {
    margin-right: 13px;
    margin-bottom: 10px;
    align-self: flex-end;
  }

  @media screen and (max-width: 992px) {
    width: calc(50% - 3vw);
    aspect-ratio: 1;
  }
`;

export const MyGraphWrapper = styled(Card)`
  width: calc(100% - 3vw);
  min-height: 50vh;
  display: flex;

  .title {
    margin-bottom: 4vh;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    padding-bottom: ;
    border-bottom: 2px solid var(--text);

    .more {
      font-weight: 400;
      opacity: 0.5;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }

  .chartBox {
    height: auto;
    width: 60%;

    .chart {
      height: 100%;
      min-width: 300px;
      width: 100%;

      * {
        color: var(--text-button);
      }
    }
  }

  .list {
    width: 40%;
    padding: 0 2vw;

    .nodata {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
    }

    .recent {
      display: flex;
      justify-content: space-between;
      align-items: start;
      padding: 1vh 0;
      border-bottom: 1px solid var(--shadow-dark);
      margin-bottom: 1vh;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  @media screen and (max-width: 992px) {
    margin: 0;
    flex-direction: column;
    width: 100%;

    .chartBox {
      width: 100%;
      height: 100%;

      .chart {
        min-height: 400px;
      }
    }

    .list {
      width: 100%;
    }
  }
`;
