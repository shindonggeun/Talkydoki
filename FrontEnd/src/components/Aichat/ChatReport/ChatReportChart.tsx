import { reportDetailInterface } from "@/interface/AiChatReportInterface";
import ReactApexChart from "react-apexcharts";

function ChatReportChart({
  reportDetail,
}: {
  reportDetail: reportDetailInterface;
}) {
  const scoreName = ["어휘력", "문법", "단어", "문맥 이해도", "유창성"];
  const scoresArray = [
    reportDetail.vocabularyScore,
    reportDetail.grammarScore,
    reportDetail.wordScore,
    reportDetail.FluencyScore,
    reportDetail.ContextScore,
  ];
  const options = {
    chart: {
      type: "polarArea",
    },
    stroke: {
      show: false,
    },
    labels: scoreName,
    legend: {
      show: false, // 범례 숨기기
    },
    grid: {
      show: false, // 차트의 격자 무늬 숨기기
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactApexChart
        options={options}
        series={scoresArray}
        type="polarArea"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}

export default ChatReportChart;
