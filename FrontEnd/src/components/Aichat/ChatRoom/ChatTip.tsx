import { useAiChatStore } from "@/stores/aichatStore";
import { ChatTipContainer } from "@/styles/Aichat/AiChatRoom";
import { useEffect, useState } from "react";
import { ChatMessage } from "./ChatRoom";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
} from "@aws-sdk/client-polly";
import env from "@/interface/SttInterface";

type ChatTipProps = {
  lastUserTip: ChatMessage | null; // lastUserTip props로 받음
};

function ChatTip({ lastUserTip }: ChatTipProps) {
  const globalIsTip = useAiChatStore((state) => state.globalIsTip);
  const [isTip, setIstip] = useState(globalIsTip);
  //등장애니메이션 상태
  const [isVisible, setIsVisible] = useState(false);

  // 투명도 조절
  const [isBehind, setIsBehind] = useState(false);

  useEffect(() => {
    if (lastUserTip) {
      setTimeout(() => setIsVisible(true), 2000); // 2초 딜레이 후 보이게 설정
    }
  }, [lastUserTip]);
  const handleTipClick = () => {
    setIsBehind((prev) => !prev); // 클릭 시 상태 토글 투명해지고 뒤로 보내기
  };
  console.log("isTip:", isTip);
  console.log("lastUserTip", lastUserTip);
  useEffect(() => {
    setIstip(globalIsTip);
  }, [globalIsTip]);

  // 추가
  const synthesizeSpeech = async (text: string | undefined) => {
    const client = new PollyClient({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
    const params: SynthesizeSpeechCommandInput = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Takumi",
    };

    try {
      const { AudioStream } = await client.send(
        new SynthesizeSpeechCommand(params)
      );
      if (AudioStream) {
        console.log("AudioStream", AudioStream);
        const webStream = AudioStream.transformToWebStream();

        const response = new Response(webStream);
        const audioBlob = await response.blob();

        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        console.log(audio);
        audio.play();

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isTip ? (
        <ChatTipContainer
          className={`${isVisible ? "isVisible" : ""} ${
            isBehind ? "isBehind" : ""
          }`}
          onClick={handleTipClick}
        >
          <div className="volume-box">
            <VolumeUpIcon
              style={{ fontSize: "17px", cursor: "pointer" }}
              onClick={(event) => {
                event.stopPropagation();
                synthesizeSpeech(lastUserTip?.japanese);
              }}
            />
          </div>

          <div className="message-text">
            {lastUserTip?.japanese}
            {lastUserTip?.korean}{" "}
          </div>
          <div className="message-suggest">TIP 다음과 같이 말해보세요</div>

          <div className="message-record">녹음버튼을 누르고 말해주세요</div>
        </ChatTipContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default ChatTip;
