import styled from "styled-components";

export const ChatReportCarouselSection = styled.section`
  width: 100%;
  height: 91%;
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
    opacity: 0.3;
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

  .carousel-btn:hover {
    opacity: 1;
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
  height: 100%;
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
    margin-top: 10vh;
  }
  .apexcharts-pie text,
  .apexcharts-pie circle {
    display: none;
  }
  .conversation-summary-wrapper {
    width: 100%;
    height: fit-content;
    padding: 3vh 1vw 3vh 3vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-modal);
  }
  .conversation-summary {
    max-width: calc(100% - 130px);
  }
  .next-report-icon {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 130px;
    color: var(--main);
  }
`;
