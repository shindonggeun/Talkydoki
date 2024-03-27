import { ArticleContainer } from "@/styles/News/Detail/container";
import NewsReadLine from "./ui/NewsReadLine";
import { useState } from "react";

type Props = {
  newsId: number;
  news: string[][][];
  fullNews: string[];
};

function ArticleSpeak({ newsId, news, fullNews }: Props) {
  const [now, setNow] = useState<number | null>(null);

  return (
    <ArticleContainer>
      {news.map((each, idx) => {
        return (
          <NewsReadLine
            key={idx}
            newsId={newsId}
            idx={idx}
            now={now}
            setNow={setNow}
            news={each}
            fullNews={fullNews[idx]}
          />
        );
      })}
    </ArticleContainer>
  );
}

export default ArticleSpeak;
