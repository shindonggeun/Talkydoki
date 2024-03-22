import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

function ChatReportChart() {
  const theme = useTheme();
  const chartData: {
    series: ApexOptions["series"];
    options: ApexOptions;
  } = {
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
      chart: {
        type: "polarArea",
      },
      colors: [theme.main.color],
      stroke: {
        colors: [theme.doc.backgroundModal],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <ReactApexChart
      series={chartData.series}
      options={chartData.options}
      type="polarArea"
      width={"100%"}
      height={"90%"}
    />
  );
}

export default ChatReportChart;
