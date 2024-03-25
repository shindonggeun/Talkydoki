import ThumbnailView from "@/components/ui/ThumbnailView";
import { SummaryWrapper } from "@/styles/News/Detail/container";
import { Divider } from "@mui/material";

type Props = {
  title: string;
  url: string;
  date: string;
  images: string[];
  summary: string[][][];
  korSummary: string[];
};

function TitleSection({
  title,
  url,
  date,
  images,
  summary,
  korSummary,
}: Props) {
  return (
    <>
      <h1 style={{ fontWeight: 900 }}>{title}</h1>
      <div className="info">작성일: {date.slice(0, 10)}</div>
      <div className="info">url: {url}</div>
      <Divider sx={{ margin: "2vh 0" }} />
      {/* 이미지 */}
      <div style={{ margin: "10vh 0" }}>
        <ThumbnailView images={images} isThumb={false} />
      </div>
      {/* 요약 */}
      <SummaryWrapper>
        <div>요약</div>
        <Divider />
        {/* 뉴스 summary section */}
        {summary.map((line, idx) => (
          <div key={idx} className="jp">
            {line.map((each, idx) => (
              <span key={idx}>{each[0]}</span>
            ))}
          </div>
        ))}
        <div className="kor">{korSummary}</div>
      </SummaryWrapper>
    </>
  );
}

export default TitleSection;
