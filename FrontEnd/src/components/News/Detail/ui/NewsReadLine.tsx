import React, { useEffect, useRef, useState } from "react";
import { ReadLineContainer } from "@/styles/News/Detail/container";
import { useQueryClient } from "@tanstack/react-query";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SpeechBox from "./SpeechBox";
import { JptoKor, KanaToHira, hasMeaning } from "@/util/language/japanese";
import { useButtonActions, useNewsSpeed } from "@/stores/newsStore";

type Props = {
  news: string[][];
  now: number | null;
  setNow: React.Dispatch<React.SetStateAction<number | null>>;
  newsId: number;
  idx: number;
  fullNews: string;
};

function NewsReadLine({ news, now, setNow, idx, newsId, fullNews }: Props) {
  const queryClient = useQueryClient();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { setIsPlayingEach } = useButtonActions();
  const newsSpeed = useNewsSpeed();

  // 오디오 세팅
  useEffect(() => {
    setIsPlaying(false);
    if (now != idx) return;
    if (!audioRef.current) return;
    const sound = queryClient.getQueryData(["getVoice", newsId, idx]) as string;
    if (sound == undefined) return;
    audioRef.current.src = sound;
  }, [now]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.playbackRate = newsSpeed;
      setIsPlayingEach(true);
      audioRef.current.play();
    } else {
      setIsPlayingEach(false);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    // 각 문장 선택
    <ReadLineContainer
      className={idx == now ? "selected" : undefined}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("playIcon")) return;
        if (idx != now) {
          setNow(idx);
        }
      }}
    >
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
        <div>
          {news.map((each, idx) => {
            const jpRead = KanaToHira(each[1]);

            return (
              <span className="jp" key={idx}>
                {each[0]}
                {hasMeaning(each[4]) && (
                  <span className="jpRead">
                    {jpRead} / {JptoKor(jpRead)}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      {/* STT */}
      {idx == now && <SpeechBox newsId={newsId} news={fullNews} idx={idx} />}
    </ReadLineContainer>
  );
}

export default NewsReadLine;
