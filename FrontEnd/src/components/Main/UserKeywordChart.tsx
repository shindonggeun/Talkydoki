import { KeywordChartWrapper } from "@/styles/Main/keywordChart";
import { Divider } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

function UserKeywordChart() {
  const theme = useTheme();
  const [chartData, setChartdata] = useState<{
    series: ApexOptions["series"];
    options: ApexOptions;
  }>({
    series: [
      {
        data: [
          {
            x: "New Delhi",
            y: 218,
          },
          {
            x: "Kolkata",
            y: 149,
          },
          {
            x: "Mumbai",
            y: 184,
          },
          {
            x: "Ahmedabad",
            y: 55,
          },
          {
            x: "Bangaluru",
            y: 84,
          },
          {
            x: "Pune",
            y: 31,
          },
          {
            x: "Chennai",
            y: 70,
          },
          {
            x: "Jaipur",
            y: 30,
          },
          {
            x: "Surat",
            y: 44,
          },
          {
            x: "Hyderabad",
            y: 68,
          },
        ],
      },
    ],
    options: {
      legend: {
        show: false,
      },
      chart: {
        height: 100,
        type: "treemap",
        toolbar: {
          show: false,
        },
      },
      colors: [theme.main.color],
    },
  });

  return (
    <KeywordChartWrapper>
      <div>나의 키워드</div>
      <Divider />
      <ReactApexChart
        series={chartData.series}
        options={chartData.options}
        type="treemap"
      />
    </KeywordChartWrapper>
  );
}

export default UserKeywordChart;
