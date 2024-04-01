// import { useState } from "react";
import { useGetArticle } from "@/api/newsApi";
import { useLocation } from "react-router-dom";
import {
  NewsArticleWrapper,
  NewsWrapper,
} from "@/styles/News/Detail/container";
import ArticleRead from "@/components/News/Detail/ArticleRead";
import SideWidget from "@/components/News/Detail/SideWidget";
import TitleSection from "@/components/News/Detail/TitleSection";
import WordSearch from "@/components/News/Detail/ui/WordSearch";
import { useEffect, useState } from "react";
import ArticleSpeak from "@/components/News/Detail/ArticleSpeak";
import { useButtonActions } from "@/stores/newsStore";

type Props = {};

function NewsDetail({}: Props) {
  const { state } = useLocation();
  const newsId = state.newsId;
  const [isReadMode, setIsReadMode] = useState(true);
  const { data, isFetching } = useGetArticle(newsId);
  const { setIsPlaying } = useButtonActions();

  useEffect(() => {
    setIsPlaying(false);
  }, [isReadMode]);

  if (isFetching || !data) return <></>;

  return (
    <NewsWrapper>
      <WordSearch />
      <NewsArticleWrapper>
        <TitleSection
          title={data.fullTitle}
          kortitle={data.titleTranslated}
          url={data.srcOrigin}
          date={data.writeDate}
          images={data.newsImages}
          summary={data.summary}
          korSummary={data.summaryTranslated}
        />
        {isReadMode ? (
          <ArticleRead
            newsId={newsId}
            news={data.content}
            korNews={data.contentTranslated}
            fullNews={data.fullNews}
          />
        ) : (
          <ArticleSpeak
            newsId={newsId}
            news={data.content}
            fullNews={data.fullNews}
          />
        )}
      </NewsArticleWrapper>
      <SideWidget
        keyword={data.newsKeywords}
        isReadMode={isReadMode}
        setIsReadMode={setIsReadMode}
      />
    </NewsWrapper>
  );
}

export default NewsDetail;
