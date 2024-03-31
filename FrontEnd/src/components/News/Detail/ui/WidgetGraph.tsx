import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { KeywordItem } from "@/styles/News/Detail/ui";
import { useIsMobile } from "@/stores/displayStore";
import { useSetIsSearchOn, useSetSearchWord } from "@/stores/newsStore";

type Props = {
  keyword: { [keyword: string]: { count: number; read: string } };
};

function WidgetGraph({ keyword }: Props) {
  const isMobile = useIsMobile();
  const [focused, setFocused] = useState(-1);
  const setSearchWord = useSetSearchWord();
  const setIsSearchOn = useSetIsSearchOn();

  const searchHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    word: string,
    read: string
  ) => {
    setSearchWord({ word, read, x: e.clientX, y: e.clientY });
    setIsSearchOn(true);
  };

  const chartData: { series: ApexOptions["series"]; options: ApexOptions } = {
    series: Object.values(keyword).map((each) => each.count),
    options: {
      chart: {
        type: "radialBar",
        events: {
          dataPointMouseEnter: (_e, _chart, config) => {
            setFocused(config.dataPointIndex);
          },
          dataPointMouseLeave: () => {
            setFocused(-1);
          },
        },
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
              show: false,
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

  useEffect(() => {
    if (focused == -1) return;
  }, [focused]);

  const graphColors = [
    `37, 159, 251`,
    `37, 178, 130`,
    `253, 187, 58`,
    `254, 96, 119`,
    `138, 116, 214`,
  ];

  return (
    <div>
      {!isMobile && (
        <ReactApexChart
          className="chart"
          options={chartData.options}
          series={chartData.series}
          type="radialBar"
          width={"100%"}
        />
      )}
      <div className="keywordSection">
        {Object.entries(keyword).map(([key, value], idx) => {
          const isFocused = focused === idx;

          return (
            <KeywordItem
              key={key}
              $color={graphColors[idx]}
              style={
                isFocused
                  ? {
                      border: `2px solid rgb(${graphColors[idx]})`,
                      color: `rgb(${graphColors[idx]})`,
                      backgroundColor: `rgba(${graphColors[idx]}, 0.2)`,
                      fontWeight: 600,
                    }
                  : undefined
              }
              onClick={(e) => searchHandler(e, key, value.read)}
            >
              {key}{" "}
              <span
                style={{
                  color: `rgb(${graphColors[idx]})`,
                }}
              >
                {value.count}
              </span>
            </KeywordItem>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(WidgetGraph);
