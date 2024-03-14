import styled from "styled-components";
import { Card } from "../common/ui/card";

export const KeywordChartWrapper = styled(Card)`
  width: 70%;
  height: 50vh;
  margin: 0;

  @media screen and (max-width: 992px) {
    width: calc(100% - 3vw);
    margin: 0;
  }
`;
