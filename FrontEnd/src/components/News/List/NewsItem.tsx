import { NewsListItemInterface } from "@/interface/NewsInterface";
import { NewsCard } from "@/styles/News/List/ui";
import ThumbnailView from "@/components/ui/ThumbnailView";
import { sentenceMaker, newsSplitter } from "@/util/language/format";

type Props = {
  news: NewsListItemInterface;
  isShowKor: boolean;
  idx: number;
};

function NewsItem({ news, isShowKor, idx }: Props) {
  return (
    <NewsCard className={`${idx % 2 == 0 ? "left" : "right"}`} $index={idx % 4}>
      <ThumbnailView images={news.newsImages} />
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
