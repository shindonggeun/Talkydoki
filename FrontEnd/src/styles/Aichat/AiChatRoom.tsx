import styled, { keyframes } from "styled-components";
import { Card } from "../common/ui/card";

export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding-left: 20vw;

  @media screen and (max-width: 992px) {
    padding: 60px 3vw 3vw;
  }
`;

export const Flexbox = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  @media screen and (max-width: 992px) {
    height: 85vh;
  }
`;

export const ChatRoomContainer = styled(Card)`
  width: 100%;
  height: 98%;
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: space-between;
`;

export const HeaderContainer = styled.div`
  height: 9%;
  padding: 3vh 3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MainContainer = styled.div`
  border-top: 3px solid var(--shadow);
  border-bottom: 3px solid var(--shadow);
  height: 79%;
  background: var(--shadow);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3vw;
  font-size: 0.8125rem;

  .message-item {
    padding: 10px;
    margin-bottom: 10px;
    background: var(--bg-modal);
    color: var(--text);
    border-radius: 10px;
    max-width: 60%;
    align-self: flex-start;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 3px var(--shadow);
  }
  .message-item.self {
    background-color: var(--main);
    align-self: flex-end;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 3px var(--shadow);
    .message-text {
      color: var(--text-button);
    }
    .buttonbox {
      color: var(--text-button);
    }
  }
  .chatbot-icon-container {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chatbot-icon {
    max-width: 100%;
    max-height: 100%;
  }
  .buttonbox {
    margin-top: 5px;
    width: 40px;
    display: flex;
    justify-content: space-between;
  }
`;

// 녹음중 애니메이션
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.16);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const FooterContainer = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .cancel-icon {
    position: absolute;
    left: 42.5%;
    cursor: pointer;
    @media screen and (max-width: 992px) {
      left: 38%;
    }
  }
  .micdiv {
    border-radius: 50%;
    width: 3.8rem;
    height: 3.8rem;
    background: linear-gradient(180deg, #6744f3 0%, #957df8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    &:hover {
      background: linear-gradient(180deg, #89abe3ff 0%, #b6d0e2ff 100%);
    }
    @media screen and (max-width: 992px) {
      width: 45px;
      height: 45px;
    }
    &.recording {
      animation: ${pulse} 1.5s infinite;
    }
  }
`;
