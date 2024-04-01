import { useUserKeyword } from "@/api/profileApi";
import { KeywordChartWrapper } from "@/styles/Main/keywordChart";
import { Divider } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

function UserKeywordChart() {
  const theme = useTheme();
  const { data } = useUserKeyword();
  const [keywords, setKeywords] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    if (data) {
      data.forEach((each, idx) => {
        if (idx < 10) {
          const newValue: { x: string; y: number } = { x: "", y: 0 };
          newValue.x = each.keyword;
          newValue.y = each.readCount;
          setKeywords((prev) => [...prev, newValue]);
        }
      });
    }
  }, [data]);

  const chartData: {
    series: ApexOptions["series"];
    options: ApexOptions;
  } = {
    series: [
      {
        data: keywords,
      },
    ],
    options: {
      legend: {
        show: false,
      },
      chart: {
        type: "treemap",
        toolbar: {
          show: false,
        },
      },
      colors: [theme.main.color],
      dataLabels: {
        style: {
          fontFamily: "Mplus",
          fontSize: "16pt",
        },
      },
      tooltip: {
        theme: theme.mode,
        style: {
          fontSize: "10pt",
        },
      },
      stroke: {
        show: false,
        colors: [theme.doc.backgroundModal],
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
  };

  return (
    <KeywordChartWrapper>
      <div>나의 키워드</div>
      <Divider />
      {keywords.length == 0 ? (
        <div className="msg">뉴스를 읽고 관심 키워드를 추가해 보세요</div>
      ) : (
        <ReactApexChart
          series={chartData.series}
          options={chartData.options}
          type="treemap"
          width={"100%"}
          height={"90%"}
        />
      )}
    </KeywordChartWrapper>
  );
}

export default UserKeywordChart;
