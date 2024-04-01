import { MainContainer } from "@/styles/Aichat/AiChatRoom";
import chatbot from "@/assets/images/logo_face.png";

import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { useTheme } from "styled-components";
interface ChatMessage {
  sender: "USER" | "GPT" | "USER_TIP";
  japanese: string;
  korean?: string | null;
}

type ChatMainProps = {
  messages: ChatMessage[];
  transcript: string;
  isRecording: boolean;
  isWaiting: boolean;
};

function ChatMain({
  messages,
  transcript,
  isRecording,
  isWaiting,
}: ChatMainProps) {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  console.log("isRecording", isRecording);
  const theme = useTheme();

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isRecording]);
  return (
    <>
      <MainContainer>
        {messages.length == 0 && (
          <div className="loading">
            <BeatLoader color={theme.grey.color} />
          </div>
        )}
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
        {messages.length > 0 && isWaiting && (
          <div className="message-item chatbot">
            <div className="chatbot-icon-container">
              <img src={chatbot} alt="Chatbot" className="chatbot-icon" />
            </div>
            <div className="message-item chat">
              <BeatLoader size={12} color={theme.grey.color} />
            </div>
          </div>
        )}
        {isRecording && (
          <div className="message-item self">
            <div className="message-text">
              {transcript ? (
                transcript
              ) : (
                <BeatLoader size={12} color={theme.main.dark} />
              )}
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </MainContainer>
    </>
  );
}

export default ChatMain;
