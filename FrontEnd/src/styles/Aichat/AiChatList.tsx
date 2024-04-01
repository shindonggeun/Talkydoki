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
  }

  .Categorybox {
  }
`;

export const NegativeTiTle = styled(NegativeTitle)`
  margin: 0;
`;

export const Categorybox = styled.div`
  width: calc(100% - 3vw);
  height: 100%;
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
