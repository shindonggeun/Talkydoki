import styled from "styled-components";

export const WordItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  margin: 5px 0;

  .read,
  .readKor {
    font-size: 10pt;
    opacity: 0;
    color: ${(props) =>
      props.theme.mode == "light" ? "var(--blue-dark)" : "var(--yellow-dark)"};

    &.show {
      opacity: 1;
    }
  }

  .readKor {
    display: none;
    color: var(--grey);
    &.show {
      display: block;
    }
  }

  .japanese {
    font-size: 14pt;

    &.meaning {
      cursor: pointer;
      &:hover {
        background-color: ${(props) =>
          props.theme.mode == "light"
            ? "var(--main-light)"
            : "var(--main-dark)"};
      }
    }
  }
`;

export const NewsTitle = styled.h1`
  font-size: 18pt;
  font-weight: 900;
`;

export const KeywordItem = styled.div`
  padding: 5px 10px;
  font-size: 10pt;
  width: fit-content;
  margin: 5px;
  border: 1px solid var(--grey);
  border-radius: 25px;

  span {
    color: var(--main);
  }
`;
