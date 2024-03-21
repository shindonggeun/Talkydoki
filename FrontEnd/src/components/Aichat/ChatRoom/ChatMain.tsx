import { MainContainer } from "@/styles/Aichat/AiChatRoom";
import chatbot from "@/assets/images/logo_face.png";

import ChatMessage from "./ChatMessage";

type Props = {};

function ChatMain({}: Props) {
  const messages = [
    {
      id: 1,
      text: "안녕하세요, 무엇을 도와드릴까요?",
      japanese: "こんにちは何を助けますか？",
      sender: "chatbot",
    },
    {
      id: 2,
      text: "오늘 날씨가 어때요?",
      japanese: "今日の天気はどうですか？",
      sender: "user",
    },
    {
      id: 3,
      text: "서울의 현재 날씨는 맑음입니다!",
      japanese: "ソウルの現在の天気は晴れです！",
      sender: "chatbot",
    },
    {
      id: 4,
      text: "감사합니다!",
      japanese: "ありがとうございます！",
      sender: "user",
    },
    {
      id: 5,
      text: "안녕하세요, 무엇을 도와드릴까요?",
      japanese: "ありがとうございます！",
      sender: "chatbot",
    },
    {
      id: 6,
      text: "오늘 날씨가 어때요?",
      japanese: "ありがとうございます！",
      sender: "user",
    },
    {
      id: 7,
      text: "서울의 현재 날씨는 맑음입니다!",
      japanese: "ソウルの現在の天気は晴れです！",
      sender: "chatbot",
    },
    {
      id: 8,
      text: "감사합니다!",
      japanese: "ヤクルトの５年目、奥川恭伸投手（２２）",
      sender: "user",
    },
  ];
  return (
    <>
      <MainContainer>
        {messages.map((message) =>
          message.sender === "chatbot" ? (
            <div key={message.id} className="message-item chatbot">
              <div className="chatbot-icon-container">
                <img src={chatbot} alt="Chatbot" className="chatbot-icon" />
              </div>
              <div className="message-item chat">
                <ChatMessage japanese={message.japanese} text={message.text} />
              </div>
            </div>
          ) : (
            <div key={message.id} className="message-item self">
              <ChatMessage japanese={message.japanese} text={message.text} />
            </div>
          )
        )}
      </MainContainer>
    </>
  );
}

export default ChatMain;
