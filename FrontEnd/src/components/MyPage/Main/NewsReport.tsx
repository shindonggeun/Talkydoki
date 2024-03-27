import { NegativeTitle } from "@/styles/common/ui/text";

type Props = {};

function NewsReport({}: Props) {
  return (
    <div className="NewsReportContainer">
      <NegativeTitle style={{ fontSize: "20pt" }}>뉴스 리포트</NegativeTitle>
    </div>
  );
}

export default NewsReport;
