import styled from "styled-components";

export const NewsCard = styled.div<{ $index: number }>`
  min-height: 50vh;
  margin: 2vh 1vw;
  padding: 0;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;

  &.left {
    flex-grow: 1;
    width: 40%;
  }

  &.right {
    width: ${(props) => (props.$index == 1 ? `40%` : `53%`)};
  }

  .thumbnail {
    width: 100%;
    height: 70%;
    object-fit: cover;
    border-radius: 5px;
  }

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

  &:hover {
    * {
      opacity: 0.5;
      /* filter: brightness(1.2); */
      /* color: var(--blue); */
    }
  }

  @media screen and (max-width: 992px) {
    &.left,
    &.right {
      width: 100%;
    }
  }
`;
