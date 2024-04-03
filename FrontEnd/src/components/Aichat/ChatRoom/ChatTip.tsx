import { useAiChatStore } from "@/stores/aichatStore";
import { ChatTipContainer } from "@/styles/Aichat/AiChatRoom";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatRoom";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
} from "@aws-sdk/client-polly";
import env from "@/interface/SttInterface";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

type ChatTipProps = {
  lastUserTip: ChatMessage | null; // lastUserTip props로 받음
};

function ChatTip({ lastUserTip }: ChatTipProps) {
  const globalIsTip = useAiChatStore((state) => state.globalIsTip);
  const [isTip, setIstip] = useState(globalIsTip);
  //등장애니메이션 상태
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
  useEffect(() => {
    setIstip(globalIsTip);
  }, [globalIsTip]);

  // 추가
  const toggleAudioPlay = () => {
    // 오디오가 아직 로드되지 않았다면, 오디오 로드
    if (!audioRef.current?.src) {
      // text가 undefined 또는 빈 문자열인 경우 함수 종료
      if (!lastUserTip?.japanese) return;

      // 오디오 로드 및 재생
      synthesizeSpeech(lastUserTip.japanese).then(() => {
        setIsPlaying(true);
      });
    } else {
      // 오디오가 이미 로드되어 있다면, 재생 또는 일시 정지
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying); // 재생 상태 토글
    }
  };
  const synthesizeSpeech = async (text: string | undefined) => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (!text) return; // text가 undefined 또는 빈 문자열인 경우 함수 종료

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
        const webStream = AudioStream.transformToWebStream();
        const response = new Response(webStream);
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (!audioRef.current) {
          audioRef.current = new Audio(audioUrl);
        } else {
          audioRef.current.src = audioUrl;
        }

        audioRef.current.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };

        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Error synthesizing speech:", err);
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
          <div className="message-record">녹음버튼을 누르고 말해주세요</div>
          <div className="message-suggest">TIP: 다음과 같이 말해보세요</div>
          <div className="flex">
            <div className="volume-box">
              {isPlaying ? (
                <StopCircleOutlinedIcon
                  style={{ fontSize: "17px", cursor: "pointer" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleAudioPlay();
                  }}
                />
              ) : (
                <VolumeUpIcon
                  style={{ fontSize: "17px", cursor: "pointer" }}
                  onClick={(event) => {
                    event.stopPropagation(); // 이벤트 버블링 방지
                    synthesizeSpeech(lastUserTip?.japanese ?? ""); // 오디오 재생
                  }}
                />
              )}
            </div>
            <div>
              <div className="message-text">{lastUserTip?.japanese}</div>
              <div className="message-text">{lastUserTip?.korean} </div>
            </div>
          </div>
        </ChatTipContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default ChatTip;
