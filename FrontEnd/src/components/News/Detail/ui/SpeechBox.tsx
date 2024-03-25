import { SpeechContainer } from "@/styles/News/Detail/container";
import React, { useEffect, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SpeechRecognition, {
  ListeningOptions,
  useSpeechRecognition,
} from "react-speech-recognition";

type Props = {};

function SpeechBox({}: Props) {
  const speechOption: ListeningOptions = {
    language: "ja-JP",
    continuous: true,
  };
  const {
    listening,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const stopRecord = () => {
    SpeechRecognition.stopListening();
  };

  const startRecord = () => {
    resetTranscript();
    SpeechRecognition.startListening(speechOption);
  };

  useEffect(() => {
    // 30초 경과 시 자동 종료
    const autoStop = setTimeout(stopRecord, 1000 * 30);
    if (listening) {
      autoStop;
    } else if (!listening) {
      clearTimeout(autoStop);
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition)
    return <SpeechContainer>지원하지 않는 브라우저입니다.</SpeechContainer>;

  return (
    <SpeechContainer>
      {listening ? (
        <MicOffIcon onClick={() => stopRecord()} />
      ) : (
        <MicIcon onClick={() => startRecord()} />
      )}
      <div>{transcript}</div>
    </SpeechContainer>
  );
}

export default SpeechBox;
