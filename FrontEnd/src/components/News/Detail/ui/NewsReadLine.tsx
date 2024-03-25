import React, { useEffect, useRef, useState } from "react";
import { ReadLineContainer } from "@/styles/News/Detail/container";
import { useQueryClient } from "@tanstack/react-query";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SpeechBox from "./SpeechBox";

type Props = {
  news: string[][];
  now: number | null;
  setNow: React.Dispatch<React.SetStateAction<number | null>>;
  newsId: number;
  idx: number;
};

function NewsReadLine({ news, now, setNow, idx, newsId }: Props) {
  const queryClient = useQueryClient();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 오디오 세팅
  useEffect(() => {
    if (now != idx) return;
    if (!audioRef.current) return;
    const sound = queryClient.getQueryData(["getVoice", newsId, idx]) as string;
    if (sound == undefined) return;
    audioRef.current.src = sound;
  }, [now]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <ReadLineContainer className={idx == now ? "selected" : undefined}>
      <div className="newscontent">
        {/* 재생버튼 */}
        {isPlaying ? (
          <PauseCircleIcon
            onClick={() => setIsPlaying((prev) => !prev)}
            className="playIcon"
          />
        ) : (
          <PlayCircleIcon
            onClick={() => setIsPlaying((prev) => !prev)}
            className="playIcon"
          />
        )}
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        {/* 뉴스 본문 */}
        <div
          onClick={() => {
            if (idx != now) {
              setNow(idx);
            }
          }}
        >
          {news.map((each, idx) => (
            <span className="jp" key={idx}>
              {each[0]}
            </span>
          ))}
        </div>
      </div>
      {/* STT */}
      {idx == now && <SpeechBox />}
    </ReadLineContainer>
  );
}

export default NewsReadLine;
