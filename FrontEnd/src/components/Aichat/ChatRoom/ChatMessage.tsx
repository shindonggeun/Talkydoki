import TranslateIcon from "@mui/icons-material/Translate";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
} from "@aws-sdk/client-polly";
import env from "@/interface/SttInterface";
import { useEffect, useRef, useState } from "react";
import { useAiChatStore } from "@/stores/aichatStore";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

type Props = {
  japanese: string;
  text?: string | null | undefined;
  feadback?: string | null;
};

function ChatMessage({ japanese, text, feadback }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const globalIsTranslate = useAiChatStore((state) => state.globalIsTranslate);
  const globalIsFeadback = useAiChatStore((state) => state.globalIsFeadback);
  const [isTranslate, setTranslate] = useState<boolean>(globalIsTranslate);
  const [isFeadback, setFeadback] = useState<boolean>(globalIsFeadback);
  console.log("isTranslate", isTranslate);

  const toggleAudioPlay = () => {
    // 오디오가 아직 로드되지 않았다면, 오디오 로드
    if (!audioRef.current?.src) {
      // text가 undefined 또는 빈 문자열인 경우 함수 종료
      if (japanese) return;

      // 오디오 로드 및 재생
      synthesizeSpeech(japanese).then(() => {
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
  useEffect(() => {
    setTranslate(globalIsTranslate);
  }, [globalIsTranslate]);
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
      <div className="message-text">{japanese}</div>
      <div className="buttonbox">
        {" "}
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
              synthesizeSpeech(japanese ?? ""); // 오디오 재생
            }}
          />
        )}
        {text && (
          <TranslateIcon
            style={{ fontSize: "17px", cursor: "pointer" }}
            onClick={() => setTranslate(!isTranslate)}
          />
        )}
        {feadback && (
          <SmartToyOutlinedIcon
            style={{ fontSize: "17px", cursor: "pointer" }}
            onClick={() => setFeadback(!isFeadback)}
          />
        )}
      </div>

      <div className={`messageContainer ${isTranslate ? "isVisible" : ""}`}>
        {text}
      </div>
      <div className={`messageContainer ${isFeadback ? "" : "isVisible"}`}>
        {feadback}
      </div>
    </>
  );
}

export default ChatMessage;
