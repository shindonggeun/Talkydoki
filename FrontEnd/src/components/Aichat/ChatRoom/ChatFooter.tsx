import { FooterContainer } from "@/styles/Aichat/AiChatRoom";
import MicIcon from "@mui/icons-material/Mic";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
type Props = {};

// 녹음 하는중 시각화 추가 필요
function ChatFooter({}: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  const cancelRecording = () => {
    setIsRecording(false);
  };
  return (
    <>
      <FooterContainer>
        {isRecording && (
          <div className="cancel-icon" onClick={cancelRecording}>
            <HighlightOffIcon
              style={{
                fontSize: "2.2rem",
                color: "#DC143C",
                marginRight: "10px",
              }}
            />
          </div>
        )}
        <div
          className={`micdiv ${isRecording ? "recording" : ""}`}
          onClick={toggleRecording}
        >
          <MicIcon style={{ fontSize: "2.5rem", color: "#FFFFFF" }} />
        </div>
      </FooterContainer>
    </>
  );
}

export default ChatFooter;
