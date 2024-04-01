import styled from "styled-components";
import { FooterContainer } from "./ui/AiChat";
import { BlueButton } from "../common/ui/button";

export const ChatReportCarouselSection = styled.section`
  width: 100%;
  flex-grow: 1;
  border-top: 3px solid var(--shadow);
  border-bottom: 3px solid var(--shadow);
  background: var(--shadow);
  position: relative;
  overflow-x: hidden;

  .track {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: calc(2 * 100%);
    overflow: hidden;
    transition: left 0.3s ease;
  }
  .carousel-btn-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .carousel-btn-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .carousel-btn {
    position: relative;
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--main);
    z-index: 1;
    transition: opacity 0.3s, background-color 0.3s;
  }

  .carousel-btn::before {
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    z-index: -1;
    filter: blur(30px);
    transition: opacity 0.3s;
    opacity: 0;
  }

  .carousel-btn:hover::before {
    opacity: 0.8;
    background: var(--grey);
  }

  .carousel-btn > * {
    position: relative;
    z-index: 2;
  }

  .left-btn {
    justify-content: end;
  }

  .right-btn {
    justify-content: start;
  }
`;

// 캐러셀 내용물
export const ChatReportCarouselItem = styled.div`
  transition: transform 0.5s ease;
  width: 100%;
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .chart-report-carousel-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .chart-report-wrapper {
    width: 100%;
    height: 100%;
    margin: auto;
  }
  .apexcharts-svg {
    height: fit-content;
  }

  .apexcharts-pie text,
  .apexcharts-pie circle {
    display: none;
  }
`;

export const DoneButton = styled(BlueButton)`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: var(--main);
`;

export const ChatReportFooter = styled(FooterContainer)`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3vh 3vw;
  background: var(--bg-modal);
  .conversation-summary {
    max-width: calc(100% - 70px);
  }
  .done-btn {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 70px;
    color: var(--main);
  }
`;
