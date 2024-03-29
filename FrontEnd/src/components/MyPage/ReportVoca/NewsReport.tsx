import { RecordInterface } from "@/interface/UserInterface";
import { NewsReportWrapper } from "@/styles/Mypage/components";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

type Props = {
  user: { score: number; date: string }[];
  average: { averageScore: number; date: string }[];
};

function NewsReport({ user, average }: Props) {
  const [records, setRecords] = useState<RecordInterface[]>([]);
  const theme = useTheme();

  // 그래프에 사용할 데이터 배열 제작
  useEffect(() => {
    const today = new Date().getTime();
    setRecords([]);

    user.forEach((each) => {
      const date = each.date;
      const averageDate = average.filter((each) => {
        const scoreDate = new Date(each.date).getTime();
        // 일주일 이내 기록만 추가
        return (
          each.date == date && today - scoreDate <= 1000 * 60 * 60 * 24 * 7
        );
      });

      if (averageDate.length > 0) {
        const averageScore = averageDate[0].averageScore;
        setRecords((prev) => [
          ...prev,
          { date, averageScore, userScore: each.score },
        ]);
      }
    });
  }, []);

  const chartOptions: { series: ApexOptions["series"]; options: ApexOptions } =
    {
      series: [
        {
          name: "나의 평균",
          data: records.map((each) => each.userScore),
        },
        {
          name: "유저 평균",
          data: records.map((each) => each.averageScore),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        colors: [theme.main.color, theme.green.color],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        yaxis: {
          stepSize: 0.5,
          min: 0,
          max: 1,
          decimalsInFloat: 2,
        },
        xaxis: {
          type: "datetime",
          stepSize: 1,
          categories: records.map((each) => each.date),
        },
        tooltip: {
          x: {
            format: "yyyy-MM-dd",
          },
        },
      },
    };

  return (
    <NewsReportWrapper>
      <div className="title">나의 뉴스 쉐도잉 현황</div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={"100%"}
        />
      </div>
      <div id="html-dist"></div>
    </NewsReportWrapper>
  );
}

export default NewsReport;
