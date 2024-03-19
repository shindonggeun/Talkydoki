import { MainContainer } from "@/styles/Aichat/AiChatRoom";
import chatbot from "@/assets/images/logo_face.png";
import TranslateIcon from "@mui/icons-material/Translate";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
type Props = {};

function ChatMain({}: Props) {
  const messages = [
    { id: 1, text: "안녕하세요, 무엇을 도와드릴까요?", sender: "chatbot" },
    { id: 2, text: "오늘 날씨가 어때요?", sender: "user" },
    {
      id: 3,
      text: "서울의 현재 날씨는 맑음입니다!",
      sender: "chatbot",
    },
    { id: 4, text: "감사합니다!", sender: "user" },
    { id: 1, text: "안녕하세요, 무엇을 도와드릴까요?", sender: "chatbot" },
    { id: 2, text: "오늘 날씨가 어때요?", sender: "user" },
    { id: 3, text: "서울의 현재 날씨는 맑음입니다!", sender: "chatbot" },
    { id: 4, text: "감사합니다!", sender: "user" },
  ];
  return (
    <>
      <MainContainer>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${
              message.sender === "user" ? "self" : ""
            }`}
          >
            {message.sender !== "user" && (
              <div className="chatbot-icon-container">
                <img src={chatbot} alt="Chatbot" className="chatbot-icon" />
              </div>
            )}
            <div className="message-text">{message.text}</div>
            <div className="buttonbox">
              <VolumeUpIcon style={{ fontSize: "17px" }} />
              <TranslateIcon style={{ fontSize: "17px" }} />
            </div>
          </div>
        ))}
      </MainContainer>
    </>
  );
}

export default ChatMain;
