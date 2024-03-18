import styled from "styled-components";
import { Card } from "../common/ui/card";

import Switch from "@mui/material/Switch";

export const VocaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  div.options {
    width: 100%;
  }
`;

export const VocaCard = styled(Card)`
  margin: 2vh 1vw;
  width: calc(50% - 2vw);
  height: 25vh;
  display: flex;
  position: relative;

  *.hide {
    background-color: var(--main);
    color: var(--main);
    opacity: 0.5;
  }

  .deleteButton {
    position: absolute;
    right: 30px;
  }

  .jpNtype {
    width: 30%;

    .japanese {
      font-size: 24pt;
      font-weight: 700;
    }
    .type {
      color: var(--text);
      opacity: 0.5;
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
        color: var(--text);
        opacity: 0.5;
      }
    }

    .meaning {
      margin: 2px 0 2px 10px;
    }
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`;
