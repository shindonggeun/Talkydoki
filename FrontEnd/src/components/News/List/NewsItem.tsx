import { NewsListItemInterface } from "@/interface/NewsInterface";
import { NewsCard } from "@/styles/News/List/ui";
import ThumbnailView from "@/components/ui/ThumbnailView";
import { sentenceMaker, newsSplitter } from "@/util/language/format";

import Img1 from "@/assets/images/sampleimage/img1.jpg";
import Img2 from "@/assets/images/sampleimage/img2.jpg";
import Img3 from "@/assets/images/sampleimage/img3.jpg";

type Props = {
  news: NewsListItemInterface;
  isShowKor: boolean;
  idx: number;
};

// 뉴스 썸네일 받아오는 함수 생길 때까지 임시로 사용하는 배열
const newsImgaes = [Img1, Img2, Img3, Img2, Img3, Img2, Img3];

function NewsItem({ news, isShowKor, idx }: Props) {
  return (
    <NewsCard className={`${idx % 2 == 0 ? "left" : "right"}`} $index={idx % 4}>
      <ThumbnailView
        images={newsImgaes.slice(0, 1 + Math.floor(Math.random() * 5))}
      />
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
