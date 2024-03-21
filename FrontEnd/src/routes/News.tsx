import { useGetNewsList } from "@/api/newsApi";
import { useState } from "react";
import { Wrapper } from "@/styles/common/ui/container";
import { newsSplitter, sentenceMaker } from "@/util/language/format";
import InfiniteObserver from "@/components/ui/InfiniteObserver";
import { category, categoryInterface } from "@/interface/NewsInterface";

import {
  CategorySection,
  MenuBarSection,
  NewsSection,
} from "@/styles/News/List/container";
import { Category, NewsCard } from "@/styles/News/List/ui";
import { NegativeTitle } from "@/styles/common/ui/text";
import { FormControlLabel, Switch } from "@mui/material";

import Img1 from "@/assets/images/sampleimage/img1.jpg";
import Img2 from "@/assets/images/sampleimage/img2.jpg";
import Img3 from "@/assets/images/sampleimage/img3.jpg";

import CloseIcon from "@mui/icons-material/Close";
import ThumbnailView from "@/components/ui/ThumbnailView";
import { useIsDark } from "@/stores/displayStore";

function News() {
  const [isShowKor, setIsShowKor] = useState(true);
  const [selected, setSelected] = useState<categoryInterface[]>([]);
  const [categories, setcategories] = useState(category);
  const isDark = useIsDark();

  const { data, isLoading, fetchNextPage, isFetching } =
    useGetNewsList(selected);

  // 뉴스 썸네일 받아오는 함수 생길 때까지 임시로 사용하는 배열
  const newsImgaes = [Img1, Img2, Img3, Img2, Img3, Img2, Img3];

  const observerCallback: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      fetchNextPage();
    }
  };

  const addCategory = (category: categoryInterface) => {
    setSelected((prev) => [...prev, category]);
    setcategories((prev) => prev.filter((each) => each.id != category.id));
  };

  const removeCategory = (category: categoryInterface) => {
    setSelected((prev) => prev.filter((each) => each.id != category.id));
    setcategories((prev) => [...prev, category]);
  };

  if (isLoading) return <></>;

  return (
    <Wrapper>
      <NegativeTitle>뉴스</NegativeTitle>
      <CategorySection>
        {selected.map((cat) => (
          <Category
            $isDark={isDark}
            key={cat.id}
            className="selected"
            onClick={() => removeCategory(cat)}
          >
            <CloseIcon className="icon" />
            {cat.korName}
          </Category>
        ))}
        {categories.map((cat) => (
          <Category
            $isDark={isDark}
            onClick={() => addCategory(cat)}
            key={cat.id}
          >
            {cat.korName}
          </Category>
        ))}
      </CategorySection>
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
                <ThumbnailView
                  images={newsImgaes.slice(
                    0,
                    1 + Math.floor(Math.random() * 5)
                  )}
                ></ThumbnailView>
                {/* <img
                  className="thumbnail"
                  src={newsImgaes[Math.floor(Math.random() * 3)]}
                  alt=""
                /> */}
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
