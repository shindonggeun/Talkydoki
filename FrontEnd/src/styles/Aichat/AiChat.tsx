import styled from "styled-components";
import { Card } from "../common/ui/card";

export const ChatWrapper = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 0;

  padding: 3vh 3vw 3vh 20vw;
  @media screen and (max-width: 992px) {
    padding: 80px 3vw 3vh 3vw;
  }
`;

export const ChatCard = styled(Card)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
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
  height: 100%;
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
    max-width: calc(60+50px);
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
      max-width: 100%;
      max-height: 100%;
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
      width: calc(100%-50px);
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
