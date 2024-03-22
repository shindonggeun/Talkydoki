import React, { useState } from "react";
import { useGetArticle } from "@/api/newsApi";
import { useLocation } from "react-router-dom";
import {
  NewsArticleWrapper,
  NewsWidget,
  NewsWrapper,
} from "@/styles/News/Detail/container";
import ArticleRead from "@/components/News/Detail/ArticleRead";
import SideWidget from "@/components/News/Detail/SideWidget";
import TitleSection from "@/components/News/Detail/TitleSection";

type Props = {};

function NewsDetail({}: Props) {
  const { state } = useLocation();
  const newsId = state.newsId;
  const [isReadMode, setIsReadMode] = useState(true);
  const { data, isFetching } = useGetArticle(newsId);

  if (isFetching || !data) return <></>;

  return (
    <NewsWrapper>
      <NewsArticleWrapper>
        <TitleSection
          title={data.title}
          url={data.srcOrigin}
          date={data.writeDate}
          images={data.newsImages}
        />
        <ArticleRead news={data} />
      </NewsArticleWrapper>
      <SideWidget />
    </NewsWrapper>
  );
}

export default NewsDetail;
