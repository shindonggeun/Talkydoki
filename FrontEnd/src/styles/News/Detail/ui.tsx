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
    color: var(--yellow-dark);

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
  }
`;

export const NewsTitle = styled.h1`
  font-size: 18pt;
  font-weight: 900;
`;
