import { MainContainer } from "@/styles/Aichat/AiChat";
import chatbot from "@/assets/images/logo_face.png";

import ChatMessage from "../ChatMessage";
import { MainSession } from "@/styles/Aichat/AiChatRoom";
// 컴포넌트화필요 타입
// 메시지 타입 정의
interface ChatMessage {
  sender: "USER" | "GPT" | "USER_TIP";
  japanese: string;
  korean?: string | null;
}

type ChatMainProps = {
  messages: ChatMessage[];
};

function ChatMain({ messages }: ChatMainProps) {
  return (
    <MainSession>
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
    </MainSession>
  );
}

export default ChatMain;
