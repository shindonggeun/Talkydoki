import { reportDetailInterface } from "@/interface/AiChatReportInterface";
import { useIsDark } from "@/stores/displayStore";
import { PolarAreaChart } from "@/styles/common/polarAreaChart";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function ChatReportChart({
  reportDetail,
  showLegend,
}: {
  reportDetail: reportDetailInterface;
  showLegend: boolean;
}) {
  const isDark = useIsDark();
  // CSS 변수 '--text'의 실제 값을 읽어옵니다.
  const [textColor, setTextColor] = useState<string>("");
  useEffect(() => {
    setTextColor(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--text")
        .trim()
    );
  }, [textColor, isDark]);
  console.log(textColor);
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
    yaxis: {
      labels: {
        style: {
          colors: textColor,
        },
      },
      stepSize: 1,
    },
    legend: {
      show: showLegend,
      position: "bottom" as "top" | "right" | "bottom" | "left",
      formatter: (val: string, opts: any) =>
        val + " : " + opts.w.globals.series[opts.seriesIndex],
      labels: {
        colors: textColor,
      },
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0.3,
          strokeColor: textColor,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
  };

  return (
    <PolarAreaChart>
      <ReactApexChart
        options={options}
        series={scoresArray}
        type="polarArea"
        width={"100%"}
        height={"100%"}
      />
    </PolarAreaChart>
  );
}

export default ChatReportChart;
