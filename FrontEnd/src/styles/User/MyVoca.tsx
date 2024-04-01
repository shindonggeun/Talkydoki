import styled from "styled-components";
import { Card } from "../common/ui/card";

export const VocaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  div.nodata {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
  }

  div.options {
    width: 100%;
    text-align: end;
    padding: 0 3vw;
  }
`;

export const VocaCard = styled(Card)`
  margin: 2vh 1vw;
  width: calc(50% - 2vw);
  height: 25vh;
  display: flex;
  position: relative;

  *.hide {
    & > * {
      color: transparent;
      border-bottom: 2px solid var(--shadow-dark);
      width: fit-content;
    }

    &:hover {
      & > * {
        color: var(--text);
      }
    }
  }

  .deleteNadd {
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  .jpNtype {
    width: 30%;

    .japanese {
      font-size: 24pt;
      font-weight: 700;
      word-break: keep-all;
    }
    .type {
      opacity: 0.5;
      color: var(--text);
    }
  }

  .readNmean {
    width: 70%;

    .read {
      display: flex;
      margin-bottom: 1vh;
      width: fit-content;

      & > * {
        margin: 0 5px;
        opacity: 0.5;
      }
    }

    .meaning {
      margin: 2px 0 2px 10px;
      height: 80%;
    }
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`;
