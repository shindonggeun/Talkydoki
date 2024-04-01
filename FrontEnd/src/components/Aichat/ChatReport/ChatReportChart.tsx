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
    stroke: {
      show: false,
    },
    labels: scoreName,
    legend: {
      show: true,
      position: "bottom" as "top" | "right" | "bottom" | "left",
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
