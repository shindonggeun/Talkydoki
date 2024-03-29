import { reportDetailInterface } from "@/interface/AiChatReportInterface";
import ReactApexChart from "react-apexcharts";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";

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
    stroke: {
      show: false,
    },
    labels: scoreName,
    legend: {
      show: true,
      formatter: (val: string, opts: any) =>
        val + " : " + opts.w.globals.series[opts.seriesIndex],
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
  };

  return (
    <div className="chart-report-wrapper">
      <div style={{ width: "100%", height: "100%" }}>
        <ReactApexChart
          options={options}
          series={scoresArray}
          type="polarArea"
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className="conversation-summary-wrapper">
        <div className="conversation-summary">
          {reportDetail.conversationSummary}
        </div>
        <div className="next-report-icon">
          채팅 리포트
          <DoubleArrowRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default ChatReportChart;
