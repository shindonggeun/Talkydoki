import { MainContainer } from "@/styles/Aichat/AiChatRoom";
import chatbot from "@/assets/images/logo_face.png";

import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
interface ChatMessage {
  sender: "USER" | "GPT" | "USER_TIP";
  japanese: string;
  korean?: string | null;
}

type ChatMainProps = {
  messages: ChatMessage[];
  transcript: string;
  isRecording: boolean;
};

function ChatMain({ messages, transcript, isRecording }: ChatMainProps) {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  console.log("isRecording", isRecording);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isRecording]);
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
        {isRecording &&
          (transcript ? (
            <div
              className="message-item self"
              style={{
                backgroundColor: "var(--shadow-dark)",
              }}
            >
              <div className="message-text">
                <p>{transcript}</p>
              </div>
            </div>
          ) : (
            <div
              className="message-item self"
              style={{ backgroundColor: "transparent" }}
            >
              <BeatLoader />
            </div>
          ))}

        <div ref={endOfMessagesRef} />
      </MainContainer>
    </>
  );
}

export default ChatMain;
