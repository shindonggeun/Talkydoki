import TranslateIcon from "@mui/icons-material/Translate";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
} from "@aws-sdk/client-polly";
import env from "@/interface/SttInterface";
import { useEffect, useState } from "react";
import { useAiChatStore } from "@/stores/aichatStore";
type Props = {
  japanese: string;
  text?: string | null | undefined;
  feadback?: string | null;
};

function ChatMessage({ japanese, text, feadback }: Props) {
  const globalIsTranslate = useAiChatStore((state) => state.globalIsTranslate);
  const globalIsFeadback = useAiChatStore((state) => state.globalIsFeadback);
  const [isTranslate, setTranslate] = useState<boolean>(globalIsTranslate);
  const [isFeadback, setFeadback] = useState<boolean>(globalIsFeadback);
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
        const webStream = AudioStream.transformToWebStream();

        const response = new Response(webStream);
        const audioBlob = await response.blob();

        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
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
      <div className="message-text">{japanese}</div>
      <div className="buttonbox">
        {" "}
        <VolumeUpIcon
          style={{ fontSize: "17px", cursor: "pointer" }}
          onClick={() => synthesizeSpeech(japanese)}
        />
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
