import React, { useState } from "react";
import { FooterContainer } from "@/styles/Aichat/AiChatRoom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { BlueButton } from "@/styles/common/ui/button";
import { useNavigate } from "react-router-dom";
import { getCookie } from "@/util/auth/userCookie";
import { useSendMessage } from "@/api/chatApi";
import { getStompClient } from "@/util/websocket/stompConnection";

interface ChatFooterProps {
  roomId: string | undefined;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ roomId }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const navigate = useNavigate();
  // 타이머
  const [timer, setTimer] = useState<number | undefined>(undefined);
  console.log("시각화 확인 콘솔:isRecording", isRecording);

  // const [chats, setChats] = useState<ChatMessage[]>([]);
  const [chatText, setChatText] = useState<string>("");
  const { mutate: sendChatMessage } = useSendMessage();

  const sendMessage = (text = chatText) => {
    console.log("메세지 전송");
    const token = getCookie();
    if (text.trim() !== "") {
      const message = {
        sender: "USER",
        japanese: text,
        korean: null,
      };

      const sendpayload = {
        roomId: roomId ?? "", // 현재 roomId 사용
        data: message, // 위에서 생성한 메시지 객체
      };

      getStompClient()?.send(
        `/pub/ai/chat/user/${roomId}`,
        JSON.stringify(message),
        {
          Authorization: `Bearer ${token}`,
        }
      );

      sendChatMessage(sendpayload);

      console.log("보낸메세지~~~", message);

      setChatText("");
      // resetTranscript();
    }
  };

  // 레코딩취소
  const cancelRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
    resetTranscript();
    SpeechRecognition.abortListening();
  };

  const toggleRecording = () => {
    if (isRecording) {
      sendMessage(transcript);
      SpeechRecognition.stopListening();
      // SpeechRecognition.abortListening();

      setTimeout(() => {
        resetTranscript(); // 인식된 텍스트 초기화
        setIsRecording(false); // 음성 인식 상태 업데이트
      }, 300); // 500ms 대기 후 실행

      clearTimeout(timer); // 설정된 타이머 취

      clearTimeout(timer);
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "ja-JP" });
      // 17초 타이머 설정

      const newTimer = window.setTimeout(() => {
        SpeechRecognition.stopListening();
        resetTranscript();
        setIsRecording((isRecording) => !isRecording);
      }, 17000);
      setTimer(newTimer as unknown as number);
    }
    setIsRecording(!isRecording);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>크롬 브라우저를 사용해주세요.</span>;
  }

  return (
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
      <div>{transcript}</div>

      <div
        className={`micdiv ${isRecording ? "recording" : ""}`}
        onClick={toggleRecording}
      >
        <MicIcon style={{ fontSize: "2.5rem", color: "#FFFFFF" }} />
      </div>
      <div className="reportdiv">
        <BlueButton
          width="95px"
          height="33px"
          onClick={() => navigate("/aichatreport")}
        >
          리포트 작성
        </BlueButton>
      </div>
    </FooterContainer>
  );
};

export default ChatFooter;
