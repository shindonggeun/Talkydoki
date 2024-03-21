import { useGetNewsList } from "@/api/newsApi";
import { useEffect, useState } from "react";
import { Wrapper } from "@/styles/common/ui/container";
import InfiniteObserver from "@/components/ui/InfiniteObserver";
import { category, categoryInterface } from "@/interface/NewsInterface";
import NewsItem from "@/components/News/List/NewsItem";

import {
  CategorySection,
  MenuBarSection,
  NewsSection,
} from "@/styles/News/List/container";
import { Category } from "@/styles/News/List/ui";
import { NegativeTitle } from "@/styles/common/ui/text";
import { FormControlLabel, Switch } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useIsDark } from "@/stores/displayStore";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";

function News() {
  const [isShowKor, setIsShowKor] = useState(true);
  const [selected, setSelected] = useState<categoryInterface[]>([]);
  const [categories, setcategories] = useState(category);

  const isDark = useIsDark();
  const setIsModalOn = useSetISModalOn();
  const setModalContent = useSetModalContent();

  const { data, isLoading, fetchNextPage, isFetching } =
    useGetNewsList(selected);

  const observerCallback: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addCategory = (category: categoryInterface) => {
    if (selected.length == 3) {
      setModalContent({
        message: "카테고리는 3개까지만 선택 가능합니다.",
        isInfo: true,
      });
      setIsModalOn(true);
      return;
    }
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

      {/* 카테고리 */}
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

      {/* 메뉴바 (번역보기) */}
      <MenuBarSection>
        <FormControlLabel
          value={isShowKor}
          control={<Switch color="purple" defaultChecked />}
          label="번역 보기"
          labelPlacement="start"
          onChange={() => setIsShowKor((prev) => !prev)}
        />
      </MenuBarSection>

      {/* 뉴스 리스트 */}
      <NewsSection>
        {data &&
          data.map((news, idx) => {
            return (
              <NewsItem
                key={news.newsId}
                news={news}
                idx={idx}
                isShowKor={isShowKor}
              />
            );
          })}
      </NewsSection>

      {/* 스크롤 옵저버 */}
      <InfiniteObserver
        observerCallback={observerCallback}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </Wrapper>
  );
}

export default News;
