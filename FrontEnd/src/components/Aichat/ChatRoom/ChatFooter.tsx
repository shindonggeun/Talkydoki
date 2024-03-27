import { FooterContainer } from "@/styles/Aichat/AiChatRoom";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MicIcon from "@mui/icons-material/Mic";

// // 스피치 api 임포트
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { BlueButton } from "@/styles/common/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {};

// 녹음 하는중 시각화 추가 필요
function ChatFooter({}: Props) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  // 타이머
  const [timer, setTimer] = useState<number | undefined>(undefined);
  console.log("시각화 확인 콘솔:isRecording", isRecording);
  const navigate = useNavigate();
  const handlGoReport = () => {
    navigate("/aichatreport");
  };

  // 스피치 api
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  const toggleRecording = () => {
    if (isRecording) {
      setMessage(transcript);

      SpeechRecognition.stopListening();
      resetTranscript();
      clearTimeout(timer);
    } else {
      setMessage("");

      SpeechRecognition.startListening({ continuous: true, language: "ja-JP" });
      // 17초 타이머 설정

      const newTimer = setTimeout(() => {
        SpeechRecognition.stopListening();
        resetTranscript();
        setIsRecording((isRecording) => !isRecording);
      }, 17000);
      setTimer(newTimer);
    }
    setIsRecording(!isRecording);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
    resetTranscript();
    SpeechRecognition.abortListening();
  };

  // 크롬 사용하지 않은 경우 출력 메세지(예외처리)
  if (!browserSupportsSpeechRecognition) {
    return <span>크롬 브라우저를 사용해주세요</span>;
  }

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
        {/* api 연결 후 삭제예정 */}
        <div>{transcript}</div>

        <div>{message}</div>
        <div
          className={`micdiv ${isRecording ? "recording" : ""}`}
          onClick={toggleRecording}
        >
          <MicIcon style={{ fontSize: "2.5rem", color: "#FFFFFF" }} />
        </div>
        <div className="reportdiv">
          <BlueButton width="95px" height="33px" onClick={handlGoReport}>
            리포트 작성
          </BlueButton>
        </div>
      </FooterContainer>
    </>
  );
}

export default ChatFooter;
