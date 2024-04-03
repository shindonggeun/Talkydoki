import styled from "styled-components";
import { Card } from "../common/ui/card";

export const VocaCard = styled(Card)`
  width: 30%;
  height: 50vh;
  margin-right: 0;
  position: relative;

  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;

    div.wordSection {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      div.wordJp {
        font-size: 28pt;
        font-weight: 800;
        margin: 10px;
        word-break: keep-all;
        text-align: center;
      }

      div.typeNread {
        margin: 2px 0;
        opacity: 0.6;
        cursor: pointer;
      }
    }

    div.meaningSection {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
    }
  }

  @media screen and (max-width: 992px) {
    width: calc(100% - 3vw);
    height: fit-content;

    .inner {
      flex-direction: row;
      justify-content: space-between;

      div.meaningSection {
        width: 60%;
        justify-content: start;
        align-items: start;
        margin-top: 0;
      }
    }
  }
`;

// 단어장 추가 버튼
export const AddVocaBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--main);
  }

  &:active {
    transform: scale(0.9);
    animation: clickAnimation 0.3s ease;
    -webkit-animation: clickAnimation 0.3s ease;
  }

  &.added {
    color: var(--main);
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
