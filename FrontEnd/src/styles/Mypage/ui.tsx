import styled from "styled-components";
import { Card } from "../common/ui/card";

export const RecordContainer = styled.div`
  width: 50%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .label {
    font-size: 14pt;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .count {
    font-size: 38pt;
    font-weight: 800;
    color: var(--main);
  }

  @media screen and (max-width: 992px) {
    .label {
      font-size: 10pt;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .count {
      font-size: 20pt;
      font-weight: 800;
      color: var(--main);
    }
  }
`;

export const BadgeContainer = styled(Card)`
  width: 30%;
  height: 100%;
  flex-grow: 1;
  margin: 0;
  position: relative;
  overflow: hidden;

  .badge {
    position: absolute;
    height: 120%;
    left: -10%;
    bottom: -20%;
    opacity: 0.4;
    z-index: 0;
  }

  .tierText {
    position: absolute;
    font-size: 36pt;
    font-weight: 900;
    z-index: 1;
  }

  @media screen and (max-width: 992px) {
    background-color: transparent;
    box-shadow: none;

    .badge {
      height: 100px;
      left: 0;
      bottom: 0;
    }

    .myRank {
      display: none;
    }

    .tierText {
      font-size: 18pt;
      right: 10%;
      top: 35%;
    }
  }
`;

export const SimpleVocaContainer = styled(Card)`
  margin: 0;
  width: 30%;
  height: 50vh;

  .title {
    font-size: 16pt;
    font-weight: 500;
  }

  .seemore {
    opacity: 0.5;
    cursor: pointer;
    height: fit-content;

    &:hover {
      opacity: 1;
    }
  }

  .nodata {
    width: 100%;
    height: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
  }

  .voca {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1vh 0;

    .jp {
      font-weight: 600;
    }
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`;
