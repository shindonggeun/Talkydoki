import styled from "styled-components";
import { CarouselItem, CarouselWrapper } from "../common/ui/carousel";

// 타이머가 있는 캐러셀
export const TimerCarouselWrapper = styled(CarouselWrapper)`
  .timerWrapper {
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;

    .timer {
      cursor: pointer;
      width: 33.1%;
      height: 8px;
      position: relative;
      background-color: rgb(255, 255, 255, 0.5);
      z-index: 2;

      &:hover {
        background-color: rgb(255, 255, 255, 0.9);
        filter: brightness(1.2);
      }
    }

    .timerBar {
      height: 8px;
      background-color: var(--main);
    }
  }
`;

// 캐러셀 내용물
export const MainCarouselItem = styled(CarouselItem)`
  transition: transform 0.5s ease;
  cursor: pointer;

  .titleBox {
    position: absolute;
    width: 80%;
    right: 30px;
    bottom: 30px;
    text-align: right;

    .jpTitle,
    .koTitle {
      color: var(--text-button);
    }

    .koTitle {
      font-size: 16pt;
    }

    .jpTitle {
      font-size: 32pt;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 992px) {
    .titleBox {
      .koTitle {
        font-size: 12pt;
      }
      .jpTitle {
        font-size: 24pt;
        font-weight: 600;
        word-break: break-all;
      }
    }
  }

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgb(20, 10, 15, 0.3) -10%,
      rgb(20, 10, 15, 1)
    );
  }

  &:hover {
    transform: scale(1.05);

    .titleBox,
    &:before {
      display: none;
    }
  }
`;
