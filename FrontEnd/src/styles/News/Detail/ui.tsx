import { ThumbnailViewWrapper } from "@/styles/common/ui/thumbnailview";
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
    display: none;
    /* opacity: 0; */
    color: var(--main);

    &.show {
      display: block;
      /* opacity: 1; */
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
