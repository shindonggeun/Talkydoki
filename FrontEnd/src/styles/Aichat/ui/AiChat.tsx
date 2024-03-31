import styled from "styled-components";
import { Card } from "../../common/ui/card";

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
  position: relative;
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

  .messageContainer {
    transition: opacity 0.6s ease-in-out, max-height 0.5s ease-in-out;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }

  .messageContainer.isVisible {
    opacity: 1;
    max-height: 100px;
  }

  .message-item.chatbot {
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    max-width: 60%;
    margin-bottom: 30px;

    .chatbot-icon-container {
      align-self: self-start;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    .chatbot-icon {
      width: 50px;
    }
    .buttonbox {
      margin: 5px 0;
      width: 40px;
      display: flex;
      justify-content: space-between;
    }
    .message-item.chat {
      display: flex;
      flex-direction: column;
      width: calc(100%-px);
      padding: 10px;
      background: var(--bg-modal);
      color: var(--text);
      max-width: 100%;
      align-self: flex-end;
      border-radius: 5px;
      box-shadow: 0px 1px 5px 3px var(--shadow);
    }
  }

  .buttonbox {
    margin: 5px 0;
    width: 40px;
    display: flex;
    justify-content: space-between;
  }
  .message-item.self {
    padding: 10px;
    margin-bottom: 30px;
    background: var(--bg-modal);
    max-width: 60%;
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
    .messageContainer {
      color: var(--text-button);
    }
  }
`;
