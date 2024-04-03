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

// const userDummy = [
//   { score: 1, date: "2024-03-20" },
//   { score: 3.2, date: "2024-03-21" },
//   { score: 5, date: "2024-03-25" },
//   { score: 4.2, date: "2024-03-24" },
//   { score: 4.3, date: "2024-03-27" },
//   { score: 3.4, date: "2024-03-28" },
//   { score: 3.2, date: "2024-03-29" },
// ];

// const averageDummy = [
//   { averageScore: 5, date: "2024-03-20" },
//   { averageScore: 5, date: "2024-03-22" },
//   { averageScore: 4, date: "2024-03-25" },
//   { averageScore: 5, date: "2024-03-26" },
//   { averageScore: 3.2, date: "2024-03-27" },
//   { averageScore: 3.1, date: "2024-03-28" },
//   { averageScore: 5, date: "2024-03-29" },
// ];

function NewsReport({ user, average }: Props) {
  const [records, setRecords] = useState<RecordInterface[]>([]);
  const theme = useTheme();

  // 그래프에 사용할 데이터 배열 제작
  useEffect(() => {
    const today = new Date().getTime();
    setRecords([]);

    average.forEach((each) => {
      const date = each.date;

      const averageScore = each.averageScore;
      const scoreDate = new Date(each.date).getTime();
      // 일주일 이내 데이터만 집계
      if (today - scoreDate > 1000 * 60 * 60 * 24 * 7) return;

      const userDate = user.filter((userScore) => userScore.date == date);
      const userScore = userDate.length > 0 ? userDate[0].score : 0;
      setRecords((prev) => [...prev, { date, averageScore, userScore }]);
    });
  }, [user, average]);

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
        theme: {
          mode: theme.mode,
        },
        chart: {
          height: 350,
          type: "area",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          background: "transparent",
        },
        colors: [theme.main.color, theme.green.color],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        yaxis: {
          stepSize: 1,
          min: 0,
          max: 5,
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
          theme: theme.mode,
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
