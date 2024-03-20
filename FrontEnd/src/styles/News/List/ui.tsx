import { ThumbnailViewWrapper } from "@/styles/common/ui/thumbnailview";
import styled from "styled-components";

// 카테고리 버튼
export const Category = styled.div<{ $isDark: boolean }>`
  margin: 1vh 10px;
  width: fit-content;
  padding: 20px 25px;
  height: 40px;
  background-color: rgb(from var(--grey) r g b / 0.4);
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  /* 선택된 카테고리 */
  &.selected {
    .icon {
      color: var(--red);
      margin-right: 5px;
      opacity: 0.8;
    }
    padding-left: 20px;
    background-color: rgb(from var(--main) r g b / 0.3);
    color: ${(props) =>
      `rgb(from var(${props.$isDark ? "--main" : "--main-dark"}) r g b / 1)`};
  }
`;

export const NewsCard = styled.div<{ $index: number }>`
  min-height: 50vh;
  max-height: 51vh;
  margin: 2vh 1vw;
  padding: 0;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &.left {
    flex-grow: 1;
    width: 40%;
  }

  &.right {
    width: ${(props) => (props.$index == 1 ? `40%` : `53%`)};
  }

  ${ThumbnailViewWrapper} {
    /* height: auto; */
    flex-grow: 1;
  }

  .titleBox {
    height: fit-content;
    margin-top: 1vh 0;

    .titleTrans {
      word-break: keep-all;
      font-size: 12pt;
      opacity: 0;

      &.show {
        opacity: 0.8;
      }
    }
    .releaseDate {
      word-break: keep-all;
      font-size: 10pt;
      opacity: 0.5;
    }

    .title {
      font-size: 16pt;
      font-weight: 900;
    }
  }

  @media screen and (max-width: 992px) {
    &.left,
    &.right {
      width: 100%;
    }
  }

  &:hover,
  &:active {
    * {
      color: var(--blue);
    }
  }
`;
