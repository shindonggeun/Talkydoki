import styled from "styled-components";
import { Card } from "../common/ui/card";

export const KeywordChartWrapper = styled(Card)`
  width: 70%;
  height: 50vh;
  margin: 0;

  .msg {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
  }

  @media screen and (max-width: 992px) {
    width: calc(100% - 3vw);
    margin: 0;
  }
`;
