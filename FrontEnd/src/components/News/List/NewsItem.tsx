import { NewsListItemInterface } from "@/interface/NewsInterface";
import { NewsCard } from "@/styles/News/List/ui";
import ThumbnailView from "@/components/ui/ThumbnailView";
import { sentenceMaker, newsSplitter } from "@/util/language/format";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { customAxios } from "@/util/auth/customAxios";
import DefaultImg from "@/assets/images/default_news_image.jpeg";

type Props = {
  news: NewsListItemInterface;
  isShowKor: boolean;
  idx: number;
};

function NewsItem({ news, isShowKor, idx }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const newsImages =
    news.newsImages.length > 0 ? news.newsImages : [DefaultImg];

  const prefetchArticle = () => {
    return queryClient.prefetchQuery({
      queryKey: ["getArticle", news.newsId],
      queryFn: () => customAxios.get(`/news/get/${news.newsId}`),
      staleTime: Infinity,
      gcTime: Infinity,
    });
  };

  return (
    <NewsCard
      className={`${idx % 2 == 0 ? "left" : "right"}`}
      $index={idx % 4}
      onClick={() => {
        navigate(`/news/detail`, { state: { newsId: news.newsId } });
        prefetchArticle();
      }}
    >
      <ThumbnailView images={newsImages} isThumb={true} />
      <div className="titleBox">
        <div className="title">
          {sentenceMaker(newsSplitter(news.title)[0])}
        </div>
        <div className="releaseDate">{news.writeDate.slice(0, 10)}</div>
        <div className={`titleTrans ${isShowKor && `show`}`}>
          {news.titleTranslated}
        </div>
      </div>
    </NewsCard>
  );
}

export default NewsItem;
