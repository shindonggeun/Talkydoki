import TranslateIcon from "@mui/icons-material/Translate";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
} from "@aws-sdk/client-polly";
import env from "@/interface/SttInterface";
import { useEffect, useState } from "react";
import { useAiChatStore } from "@/stores/aichatStore";

type Props = { japanese: string; text: string };

function ChatMessage({ japanese, text }: Props) {
  const globalIsTranslate = useAiChatStore((state) => state.globalIsTranslate);
  const [isTranslate, setTranslate] = useState<boolean>(globalIsTranslate);
  console.log("isTranslate", isTranslate);

  useEffect(() => {
    setTranslate(globalIsTranslate);
  }, [globalIsTranslate]);

  const synthesizeSpeech = async (text: string) => {
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
        // ReadableStream을 Web Stream으로 변환
        const webStream = AudioStream.transformToWebStream();

        // Blob으로 변환
        const response = new Response(webStream);
        const audioBlob = await response.blob();

        // Blob을 이용해 오디오 URL 생성
        const audioUrl = URL.createObjectURL(audioBlob);

        // Audio 객체를 사용하여 음성 재생
        const audio = new Audio(audioUrl);
        console.log(audio);
        audio.play();

        // 재생이 완료되면 URL 해제
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
      <div className="message-text">{japanese}</div>
      <div className="buttonbox">
        {" "}
        <VolumeUpIcon
          style={{ fontSize: "17px", cursor: "pointer" }}
          onClick={() => synthesizeSpeech(japanese)}
        />
        <TranslateIcon
          style={{ fontSize: "17px", cursor: "pointer" }}
          onClick={() => setTranslate(!isTranslate)}
        />
      </div>

      <div className={`messageContainer ${isTranslate ? "isVisible" : ""}`}>
        {text}
      </div>
    </>
  );
}

export default ChatMessage;
