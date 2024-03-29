import styled, { keyframes } from "styled-components";

export const MainSession = styled.section`
  transition: transform 0.5s ease;
  width: 100%;
  height: 79%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

  .reportdiv {
    font-family: "Mplus";
    font-weight: 700;
    position: absolute;
    right: 2%;
  }
`;

export const ChatTipContainer = styled.div`
  position: absolute;
  width: 60%;
  left: 20%;
  top: 68%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--grey-light);
  padding: 15px 30px;

  .message {
    align-self: flex-start;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .message-record {
    align-self: flex-start;
    font-family: "ScoreDream";
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 5px;
    @media screen and (max-width: 992px) {
      font-size: 12px;
    }
  }
  .message-suggest {
    font-family: "Mplus";
    align-self: flex-start;
    color: var(--blue);
    font-size: 12px;
    font-weight: 700;
    @media screen and (max-width: 992px) {
      font-size: 9px;
    }
  }
  .message-text {
    font-family: "Mplus";
    align-self: flex-start;
    color: var(--grey-dark);
    font-size: 14px;
    @media screen and (max-width: 992px) {
      font-size: 11px;
    }
  }
`;
