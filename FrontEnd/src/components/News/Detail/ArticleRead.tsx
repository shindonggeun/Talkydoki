import {
  ArticleContainer,
  SummaryWrapper,
  WordContainer,
} from "@/styles/News/Detail/container";
import { useEffect, useRef, useState } from "react";
import Word from "./ui/Word";
import { useGetWholeTTS } from "@/api/ttsApi";
import { useQueryClient } from "@tanstack/react-query";
import { useButtonActions, useButtonStates } from "@/stores/newsStore";
import NewsButton from "./ui/NewsButton";
import { Divider } from "@mui/material";

type Props = {
  newsId: number;
  news: string[][][];
  korNews: string[];
  summary: string[][][];
  korSummary: string[];
  fullNews: string[];
};

function ArticleRead({
  newsId,
  news,
  korNews,
  summary,
  korSummary,
  fullNews,
}: Props) {
  const [nowPlaying, setNowPlaying] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, isReadKrOn, isReadOn, isTransOn } = useButtonStates();
  const { setIsPlaying } = useButtonActions();

  const TTSList = useGetWholeTTS(newsId, fullNews);
  const queryClient = useQueryClient();
  console.log(TTSList);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isPlaying) {
      audio.pause();
      return;
    }
    const audioUrl = queryClient.getQueryData([
      "getVoice",
      newsId,
      nowPlaying,
    ]) as string;
    if (audioUrl == undefined) return;
    console.log("변경됨");
    audio.src = audioUrl;
    audio.play();
  }, [nowPlaying, isPlaying]);

  return (
    <div>
      <NewsButton />
      <SummaryWrapper>
        <div>요약</div>
        <Divider />
        {summary.map((line, idx) => (
          <div key={idx} className="jp">
            {line.map((each, idx) => (
              <span key={idx}>{each[0]}</span>
            ))}
          </div>
        ))}
        <div className="kor">{korSummary}</div>
      </SummaryWrapper>
      <ArticleContainer>
        {news.map((line, idx) => (
          <div key={idx}>
            <WordContainer
              className={isPlaying && nowPlaying == idx ? "playing" : undefined}
            >
              {line.map((each, idx) => (
                <Word
                  key={idx}
                  word={each}
                  isReadOn={isReadOn}
                  isReadKrOn={isReadKrOn}
                />
              ))}
            </WordContainer>
            <div className={`${isTransOn && "show"} translation`}>
              {korNews[idx]}
            </div>
          </div>
        ))}
      </ArticleContainer>
      <audio
        ref={audioRef}
        onEnded={() => {
          if (nowPlaying == fullNews.length - 1) {
            setIsPlaying(false);
          }
          console.log("끝");
          setTimeout(() => {
            setNowPlaying((prev) =>
              prev + 1 < fullNews.length ? prev + 1 : 0
            );
          }, 1000);
        }}
      />
    </div>
  );
}

export default ArticleRead;
