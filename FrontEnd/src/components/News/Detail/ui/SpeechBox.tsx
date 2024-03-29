import { SpeechContainer } from "@/styles/News/Detail/container";
import { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SpeechRecognition, {
  ListeningOptions,
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSendSpeech } from "@/api/newsApi";
import { useQueryClient } from "@tanstack/react-query";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ReplayIcon from "@mui/icons-material/Replay";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useIsMobile } from "@/stores/displayStore";

type Props = {
  newsId: number;
  news: string;
  idx: number;
};

function SpeechBox({ newsId, news, idx }: Props) {
  const original = news.replace(/[^ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠0-9a-zA-Zー]/g, "");
  const queryClient = useQueryClient();
  const { mutate: sendSpeech, isSuccess, isIdle } = useSendSpeech(newsId, idx);
  const [similarity, setSimilarity] = useState<number | null>(null); // 유사도
  const [permission, setPermission] = useState(false); // 마이크 허용 여부
  const isMobile = useIsMobile();

  // STT 관련
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
  const scriptRef = useRef("");

  // 녹음 관련
  const userRecordRef = useRef<HTMLAudioElement>(null);
  const mimeType = "audio/webm"; // 인코딩 타입
  const [stream, setStream] = useState<MediaStream>();
  const mediaRecorder = useRef<MediaRecorder>();
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState("");
  const [isUserAudioPlaying, setIsUserAudioPlaying] = useState(false);

  // 마이크 권한 받기
  const getPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        setStream(streamData);
      } catch (e) {
        console.log("권한이 없습니다");
      }
    }
  };

  useEffect(() => {
    getPermission();
    return () => {
      scriptRef.current = "";
      stopRecord();
    };
  }, []);

  // 목소리 녹음
  const startRecordVoice = async () => {
    if (stream) {
      const media = new MediaRecorder(stream, { mimeType: mimeType });
      mediaRecorder.current = media;
      mediaRecorder.current.start();

      const localAudioChunks: Blob[] = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (typeof e.data === "undefined") return;
        if (e.data.size === 0) return;
        localAudioChunks.push(e.data);
      };

      setAudioChunks(localAudioChunks);
    }
  };

  // 목소리 녹음 중지
  const stopRecordVoice = () => {
    if (!mediaRecorder.current) return;
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  // stt+녹음 중지
  const stopRecord = () => {
    SpeechRecognition.stopListening();
    if (!listening) return;
    const userText = scriptRef.current.replace(
      /[^ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠0-9a-zA-Zー]/g,
      ""
    );
    console.log("평가시도");
    if (userText.length > 0) {
      console.log("평가진행");
      sendSpeech({ newsId, original, userText });
    }
    stopRecordVoice();
  };

  useEffect(() => {
    scriptRef.current = transcript;
  }, [transcript]);

  // 유사도 설정
  useEffect(() => {
    if (isSuccess) {
      const data = queryClient.getQueryData([
        "shadowEvaluation",
        newsId,
        idx,
      ]) as number;
      if (data) {
        setSimilarity(data);
      }
    }
  }, [isSuccess]);

  // 녹음본 듣기 켜기/끄기
  useEffect(() => {
    if (!userRecordRef.current) return;
    if (isUserAudioPlaying) {
      userRecordRef.current.play();
    } else {
      userRecordRef.current.pause();
    }
  }, [isUserAudioPlaying]);

  const startRecord = () => {
    setAudio("");
    setSimilarity(null);
    resetTranscript();
    SpeechRecognition.startListening(speechOption);
    startRecordVoice();
  };

  useEffect(() => {
    if (!listening) return;
    const autoStop30 = setTimeout(() => stopRecord(), 1000 * 30);
    return () => clearTimeout(autoStop30);
  }, [listening]);

  useEffect(() => {
    if (!listening) return;
    // 5초 이상 말 안하면 자동 종료
    const autoStop5 = setTimeout(() => stopRecord(), 1000 * 5);
    return () => clearTimeout(autoStop5);
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition)
    return (
      <SpeechContainer>
        <div className="alert">지원하지 않는 브라우저입니다.</div>
      </SpeechContainer>
    );

  if (!permission)
    return (
      <SpeechContainer>
        <div className="alert">마이크 사용 권한을 허용해주세요.</div>
      </SpeechContainer>
    );

  return (
    <SpeechContainer>
      <ButtonGroup
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="text"
        color="purple"
        className="buttons"
      >
        {/* 녹음버튼 */}
        <Button
          onClick={() => {
            listening ? stopRecord() : startRecord();
          }}
        >
          {" "}
          {listening ? (
            <MicOffIcon />
          ) : transcript.length > 0 ? (
            <ReplayIcon />
          ) : (
            <MicIcon />
          )}
        </Button>

        {/* 듣기버튼 */}
        <Button
          disabled={audio.length == 0}
          onClick={() => {
            if (!userRecordRef.current) return;
            if (!isUserAudioPlaying) {
              setIsUserAudioPlaying(true);
            } else {
              setIsUserAudioPlaying(false);
            }
          }}
        >
          <>
            {isUserAudioPlaying ? <VolumeOffIcon /> : <VolumeUpIcon />}
            <audio
              src={audio}
              ref={userRecordRef}
              onEnded={() => setIsUserAudioPlaying(false)}
            />
          </>
        </Button>
      </ButtonGroup>
      <div className="script">
        {/* 읽은 내용 + 점수 표시 */}
        <div className="similarity">
          {isIdle && "마이크를 누르고 녹음을 시작해 보세요."}
          {similarity ? (
            <>
              {[...new Array(Math.floor(similarity))].map((_each, idx) => (
                <StarIcon key={idx} />
              ))}
              {similarity - Math.floor(similarity) == 0.5 && <StarBorderIcon />}
            </>
          ) : null}
        </div>
        <div className="transcript">{transcript.replace(/\s/g, "")}</div>
      </div>
    </SpeechContainer>
  );
}

export default SpeechBox;
