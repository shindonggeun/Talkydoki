import { chatWithFeedbackInterface } from "@/interface/AiChatReportInterface";
import ChatMessage from "../ChatRoom/ChatMessage";
import chatbot from "@/assets/images/logo_face.png";
import { MainContainer } from "@/styles/Aichat/AiChatRoom";

function ChatReportChatFeadback({
  chatsWithFeedback,
}: {
  chatsWithFeedback: chatWithFeedbackInterface[];
}) {
  return (
    <MainContainer>
      {chatsWithFeedback.map((chatWithFeedback) =>
        chatWithFeedback.sender === "GPT" ? (
          <div key={chatWithFeedback.chatId} className="message-item chatbot">
            <div className="chatbot-icon-container">
              <img src={chatbot} alt="Chatbot" className="chatbot-icon" />
            </div>
            <div className="message-item chat">
              <ChatMessage japanese={chatWithFeedback.message} />
            </div>
          </div>
        ) : (
          <div key={chatWithFeedback.chatId} className="message-item self">
            <ChatMessage
              japanese={chatWithFeedback.message}
              feadback={chatWithFeedback.feedback}
            />
          </div>
        )
      )}
    </MainContainer>
  );
}

export default ChatReportChatFeadback;
