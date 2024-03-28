import styled from "styled-components";
import { NegativeTitle } from "../common/ui/text";
import { AiChatCard } from "../common/ui/card";

export const Flexbox = styled.div`
  width: 100%;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* border: 1px solid; */
  /* overflow-y: auto; */
  padding: 3vh 3vw;
  .titleBox {
    width: calc(100% - 3vw);
    height: 10%;
    /* border: 1px solid; */
  }

  .Categorybox {
  }
`;

export const NegativeTiTle = styled(NegativeTitle)`
  margin: 0;
  /* border: 1px solid; */
`;

export const Categorybox = styled.div`
  width: calc(100% - 3vw);
  height: 100%;
  /* border: 1px solid; */
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${AiChatCard} {
    margin: 10px 0;
    width: 30%;
  }
  @media screen and (max-width: 992px) {
    ${AiChatCard} {
      width: calc(50% - 3vw);
    }
  }
`;
