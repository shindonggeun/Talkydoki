import styled from "styled-components";
import { Card } from "../common/ui/card";

export const HeaderSection = styled.section`
  width: 100%;

  .menu {
    margin: 0 1.5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .achievement {
    display: flex;
    height: 30vh;
    max-height: 300px;

    .counts {
      display: flex;
      width: 65%;
      height: 100%;
      padding: 30px 50px;
    }
  }

  @media screen and (max-width: 992px) {
    .achievement {
      background-color: var(--bg-modal);
      border-radius: 5px;
      border: 1px solid var(--shadow);
      height: 100px;

      .counts {
        padding: 0 0;
      }
    }
  }
`;

export const JandiCard = styled(Card)`
  width: calc(100% - 1.5vw);
  overflow-x: auto;
  height: 40vh;
  text-align: center;

  @media screen and (max-width: 992px) {
    width: calc(100%);
    margin: 2vh 0;
    height: 100;
  }
`;

export const ReportVocaWrapper = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

export const NewsReportWrapper = styled(Card)`
  margin: 0 1.5vw;
  width: 70%;
  height: 50vh;

  .title {
    font-size: 16pt;
    font-weight: 500;
    margin-left: 1.5vw;
    margin-bottom: 10px;
  }

  #chart {
    height: 90%;
  }

  @media screen and (max-width: 992px) {
    margin: 2vh 0;
    width: 100%;
  }
`;
