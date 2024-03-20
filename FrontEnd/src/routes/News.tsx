import { useGetNewsList } from "@/api/newsApi";
import { Wrapper } from "@/styles/Aichat/AiChatRoom";
import {
  CategorySection,
  MenuBarSection,
  NewsSection,
} from "@/styles/News/List/container";
import { NewsCard } from "@/styles/News/List/listItem";

import Img1 from "@/assets/images/sampleimage/img1.jpg";
import Img2 from "@/assets/images/sampleimage/img2.jpg";
import Img3 from "@/assets/images/sampleimage/img3.jpg";
import { newsSplitter, sentenceMaker } from "@/util/language/format";
import InfiniteObserver from "@/components/ui/InfiniteObserver";
import { useState } from "react";

import { FormControlLabel, Switch } from "@mui/material";

type Props = {};

function News({}: Props) {
  const [isShowKor, setIsShowKor] = useState(true);
  const { data, isLoading, fetchNextPage, isFetching } = useGetNewsList();

  // 뉴스 썸네일 받아오는 함수 생길 때까지 임시로 사용하는 배열
  const newsImgaes = [Img1, Img2, Img3];

  const observerCallback: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      fetchNextPage();
    }
  };

  if (isLoading) return <></>;

  return (
    <Wrapper>
      <CategorySection></CategorySection>
      <MenuBarSection>
        <FormControlLabel
          value={isShowKor}
          control={<Switch color="purple" defaultChecked />}
          label="번역 보기"
          labelPlacement="start"
          onChange={() => setIsShowKor((prev) => !prev)}
        />
      </MenuBarSection>
      <NewsSection>
        {data &&
          data.map((news, idx) => {
            return (
              <NewsCard
                key={idx}
                className={`${idx % 2 == 0 ? "left" : "right"}`}
                $index={idx % 4}
              >
                <img
                  className="thumbnail"
                  src={newsImgaes[Math.floor(Math.random() * 3)]}
                  alt=""
                />
                <div className="titleBox">
                  <div className="title">
                    {sentenceMaker(newsSplitter(news.title)[0])}
                  </div>
                  <div className="releaseDate">
                    {news.writeDate.slice(0, 10)}
                  </div>
                  <div className={`titleTrans ${isShowKor && `show`}`}>
                    {news.titleTranslated}
                  </div>
                </div>
              </NewsCard>
            );
          })}
      </NewsSection>
      <InfiniteObserver
        observerCallback={observerCallback}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </Wrapper>
  );
}

export default News;
