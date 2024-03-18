import styled from "styled-components";
import { Card } from "./card";

// 사이드바
export const SidebarWrapper = styled.div`
  width: 18vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: var(--bg);
  transition: left 0.2s ease;
  padding-right: 10px;

  @media screen and (max-width: 992px) {
    width: 300px;
  }
`;

// Nav Bar (모바일 비율에서 활성화)
export const NavbarWrapper = styled.div`
  width: 100vw;
  height: 60px;
  display: none;
  position: fixed;
  top: 0;
  z-index: 98;

  @media screen and (max-width: 992px) {
    display: block;
  }
`;

// 본문 Wrapper
export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 3vh 3vw;
  padding-left: 20vw;

  @media screen and (max-width: 992px) {
    padding-left: 2vw;
    padding-top: 60px;
  }
`;

// 모달
export const ModalCard = styled(Card)`
  position: fixed;
  padding: 0;
  height: max-content;
  max-width: 80vw;
  max-height: 80vh;
  z-index: 102;
  box-shadow: none;
  animation: moveToTop 0.2s ease-out;

  .innerText {
    width: 100%;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
  }

  .buttons {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: end;
    padding: 10px;

    & > * {
      margin: 0 3px;
    }
  }

  /* 팝업 애니메이션 */
  @-webkit-keyframes moveToTop {
    0% {
      opacity: 0.3;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 모달 팝업 시 Background
export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
`;

export const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1vh 1.5vw;

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;
