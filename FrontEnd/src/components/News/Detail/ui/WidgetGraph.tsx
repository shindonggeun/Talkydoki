import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

type Props = {
  keyword: { [keyword: string]: number };
};

function WidgetGraph({ keyword }: Props) {
  const chartData: { series: ApexOptions["series"]; options: ApexOptions } = {
    series: Object.values(keyword),
    options: {
      chart: {
        type: "radialBar",
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "14px",
            },
            value: {
              show: false,
              fontSize: "12px",
            },
          },
          track: {
            opacity: 0.7,
          },
          hollow: {
            margin: 0,
            size: "20px",
          },
        },
      },
      labels: Object.keys(keyword),
    },
  };

  return (
    <div>
      <ReactApexChart
        className="chart"
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        width={"100%"}
      />
    </div>
  );
}

export default React.memo(WidgetGraph);
