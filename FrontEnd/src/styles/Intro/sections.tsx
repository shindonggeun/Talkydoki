import styled from "styled-components";
import { Card } from "../common/ui/card";

export const IntroWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: end;

  .desc {
    width: 20vw;
    position: fixed;
    padding: 2vh 1.5vw;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 1;

    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 70%;
        height: auto;
        object-fit: contain;
        margin: 2vh 0;

        &:nth-child(2) {
          /* width: 60%; */
          margin-left: 3vw;
        }
      }
    }

    .buttons {
      margin: 2vh 0;
      width: 100%;

      * {
        margin-top: 2vh;
      }
    }
  }

  .compos {
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 992px) {
    flex-direction: column;
    justify-content: end;
    align-items: center;

    .desc {
      width: 100%;
      height: 80px;
      flex-direction: row;

      .logo {
        img {
          &:nth-child(1) {
            width: 150px;
          }

          &:nth-child(2) {
            display: none;
          }
        }
      }

      .buttons {
        display: flex;
        width: fit-content;

        * {
          width: fit-content;
          margin: 1vw;
        }
      }
    }
  }
`;

export const IntroSection = styled(Card)`
  width: 77vw;
  height: 92vh;
  flex-grow: 1;
  position: relative;
  overflow: hidden;

  h1 {
    position: absolute;
    font-weight: 900;
    font-size: 80pt;
    left: 3vw;
    color: transparent;
    background: linear-gradient(to right, var(--main), var(--blue));
    width: fit-content;
    background-clip: text;
    z-index: 1;
  }

  .description {
    position: absolute;
    left: 3.5vw;
    font-size: 20pt;
    word-break: keep-all;
    top: 250px;
    z-index: 1;
    filter: drop-shadow(0 0 2px white);
  }

  .img {
    position: absolute;
    top: -30%;
    right: -10%;
    background-color: pink;
    opacity: 0.5;
    transform: rotate(10deg);
    width: fit-content;
    z-index: 0;

    div {
      position: relative;

      &:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0%;
        background: linear-gradient(to right, var(--bg-modal) 10%, transparent);
      }

      img {
        height: 100%;
        object-fit: contain;
      }
    }
  }

  @media screen and (max-width: 992px) {
    width: 97vw;
    height: calc(93vh - 80px);
    margin-top: calc(80px + 2vh);

    h1 {
      font-size: 36pt;
    }

    .description {
      top: 150px;
    }
  }
`;
