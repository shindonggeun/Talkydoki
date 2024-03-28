import { MainContainer } from "@/styles/Aichat/AiChatRoom";
import chatbot from "@/assets/images/logo_face.png";

import ChatMessage from "./ChatMessage";
// 컴포넌트화필요 타입
// 메시지 타입 정의
interface ChatMessage {
  sender: "USER" | "GPT" | "USER_TIP"; // 메시지를 보낸 주체
  japanese: string; // 메시지의 일본어 텍스트
  korean?: string | null; // 메시지의 한국어 번역, 없을 수도 있음
}

// props 타입 정의
type ChatMainProps = {
  messages: ChatMessage[]; // 메시지 배열을 props로 받음
};

function ChatMain({ messages }: ChatMainProps) {
  return (
    <>
      <MainContainer>
        {messages.map((message, index) =>
          message.sender === "GPT" ? (
            <div key={index} className="message-item chatbot">
              <div className="chatbot-icon-container">
                <img src={chatbot} alt="Chatbot" className="chatbot-icon" />
              </div>
              <div className="message-item chat">
                <ChatMessage
                  japanese={message.japanese}
                  text={message.korean}
                />
              </div>
            </div>
          ) : message.sender === "USER" ? (
            <div key={index} className="message-item self">
              <ChatMessage japanese={message.japanese} text={message.korean} />
            </div>
          ) : null
        )}
      </MainContainer>
    </>
  );
}

export default ChatMain;
