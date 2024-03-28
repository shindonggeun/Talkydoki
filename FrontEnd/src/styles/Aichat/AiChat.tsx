import styled from "styled-components";
import { Card } from "../common/ui/card";

export const ChatWrapper = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 0;

  padding: 3vh 3vw 3vh 20vw;
  @media screen and (max-width: 992px) {
    padding: 60px 3vw 3vh 3vw;
  }
`;

export const ChatCard = styled(Card)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;
