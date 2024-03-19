import styled from "styled-components";
import { Card } from "../common/ui/card";

export const UpdateWrapper = styled(Card)`
  width: calc(100% - 1.5vw);
  height: 85vh;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    height: auto;
  }
`;

export const UpdateProfileContext = styled.div`
  width: 100%;
  height: 90%;
  margin: 10px;
  display: flex;

  .imageSection {
    width: 30%;
    margin: 3vh 2vw;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    & > * {
      margin: 1vh 0;
    }

    .label {
      font-size: 10pt;
      opacity: 0.5;
    }

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: contain;
    }

    .hiddenInput {
      height: 1;
      width: 1;
      overflow: hidden;
      white-space: nowrap;
      display: none;
    }
  }

  .infoSection {
    margin: 1vh 1vw;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    & > *,
    *.inputGroup > * {
      margin-bottom: 2vh;
    }
  }

  @media screen and (max-width: 992px) {
    flex-direction: column;
    margin: 0;

    .imageSection {
      width: 100%;
      margin: 0;

      img {
        margin: 1vh 0;
        width: 200px;
        height: 200px;
      }
    }

    .infoSection {
      margin: 0;
      width: 100%;
    }
  }
`;

export const UpdatePwContext = styled.div`
  width: 100%;
  height: 90%;
  margin: 10px;

  .section {
    width: 100%;
    display: flex;
    margin-bottom: 2vh;
    padding: 1vh 1vw;

    .title {
      margin: 1vh 0;
      width: 20%;
      text-align: end;
      padding: 1vh 2vw;
    }

    .quit {
      margin: 1vh 0;
      height: fit-content;
    }

    .form {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2vh 1vw;

      .alert {
        opacity: 0.5;
      }
    }

    &.password {
      height: 80%;
    }

    &.quit {
      height: 20%;
    }
  }

  @media screen and (max-width: 992px) {
    .section {
      flex-direction: column;
      padding: 1vh 0;

      .title,
      .form {
        width: 100%;
        text-align: start;
        margin: 0;

        .alert {
          margin: 2vh 0;
        }
      }
    }
  }
`;
