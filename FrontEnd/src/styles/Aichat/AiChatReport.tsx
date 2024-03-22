import styled from "styled-components";
import { Card } from "../common/ui/card";

export const ChatReportCard = styled(Card)`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: space-between;
`;

export const ChatReportTitleSection = styled.section`
  height: fit-content;
  padding: 3vh 3vw;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const ChatReportChartSection = styled.section`
  width: 100%;
  height: fit-content;
`;

export const ChatReportSection = styled.section`
  width: 100%;
  height: fit-content;
`;
