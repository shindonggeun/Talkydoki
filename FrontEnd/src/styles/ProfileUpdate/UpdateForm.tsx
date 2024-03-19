import styled from "styled-components";
import { Card } from "../common/ui/card";

export const UpdateWrapper = styled(Card)`
  width: calc(100% - 1.5vw);
  height: 85vh;
  /* display: flex; */
`;

export const UpdateProfileContext = styled.div`
  width: 100%;
  margin: 10px;

  .imageSection {
    width: 100%;
    margin: 3vh 2vw;
    display: flex;

    img {
      width: 150px;
      aspect-ratio: 1;
      border-radius: 50%;
      object-fit: contain;
    }

    *.hiddenInput {
      height: 1;
      width: 1;
      overflow: hidden;
      white-space: nowrap;
      display: none;
    }
  }
`;
