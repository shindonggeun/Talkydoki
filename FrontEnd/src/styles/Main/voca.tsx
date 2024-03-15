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

        &.hide {
          background-color: var(--text);

          &:hover {
            background-color: transparent;
          }
        }
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
  height: fit-content;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;

  .icon {
    &.added {
      animation: iconAnimation 0.5s;
      color: var(--text);
    }
  }

  &:before {
    content: "나의 단어장에 추가";
    position: absolute;
    right: 30px;
    top: 3px;
    width: 140px;
    max-width: 0px;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width 0.3s ease;
  }

  &:hover,
  &:active {
    background-color: var(--main);
    color: var(--text-button);

    &:before {
      color: var(--grey);
      max-width: 140px;
    }
  }

  &:active {
    background-color: var(--main-dark);
  }

  &.added {
    background-color: transparent;

    &:before {
      display: none;
    }
  }
`;
