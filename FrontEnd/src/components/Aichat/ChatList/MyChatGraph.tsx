import { useGetAllReport } from "@/api/aiChatReportApi";
import { useIsMobile } from "@/stores/displayStore";
import { MyGraphWrapper } from "@/styles/Aichat/AiChatList";

import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router";
import { useTheme } from "styled-components";

type Props = {};

const categoryTitles: { [key: string]: string } = {
  CHANGE_AT_CONVENIENCE_STORE: "편의점에서 잔돈받기",
  SOCCER_CONVERSATION: "축구 대화 하기",
  ORDER_HAMBURGER: "햄버거 주문하기",
  HAIRCUT_AT_SALON: "미용실에서 머리자르기",
  DESCRIBE_HEALTH_CONDITION_AT_HOSPITAL: "병원에서 몸상태 말하기",
  FIND_LOST_ITEM_AT_POLICE_STATION: "경찰서에서 분실물 찾기",
  ENGAGE_IN_SOCIAL_DISCUSSION: "사회적 토론하기",
  BEFRIEND_A_COLLEAGUE: "동료와 친해지기",
  BRUNCH_CONVERSATION: "브런치 식사 대화하기",
};

function MyChatGraph({}: Props) {
  const { data } = useGetAllReport();
  const [series, setSeries] = useState<number[]>();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || data == undefined) return;
    const count = data.length;
    let ContextScore = 0;
    let FluencyScore = 0;
    let grammarScore = 0;
    let vocabularyScore = 0;
    let wordScore = 0;

    data.forEach((each) => {
      ContextScore += each.ContextScore;
      FluencyScore += each.FluencyScore;
      grammarScore += each.grammarScore;
      vocabularyScore += each.vocabularyScore;
      wordScore += each.wordScore;
    });

    setSeries(() => [
      vocabularyScore / count,
      grammarScore / count,
      wordScore / count,
      FluencyScore / count,
      ContextScore / count,
    ]);
  }, [data]);

  const options: ApexOptions = {
    stroke: {
      show: false,
    },
    chart: {
      background: "transparent",
    },
    yaxis: {
      stepSize: 1,
    },
    labels: ["어휘력", "문법", "단어", "문맥 이해도", "유창성"],
    legend: {
      show: true,
      position: isMobile ? "bottom" : "right",
      formatter: (val: string, opts: any) =>
        val +
        " : " +
        `${Math.round(opts.w.globals.series[opts.seriesIndex] * 10) / 10}점`,
      fontSize: "14pt",
    },
    theme: {
      mode: theme.mode,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0.3,
          strokeColor: theme.doc.text,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
  };

  console.log(data);

  return (
    <MyGraphWrapper>
      <div className="chartBox">
        <div className="title">나의 회화 평균 점수</div>
        <div className="chart">
          <ReactApexChart
            options={options}
            series={series ? series : []}
            type="polarArea"
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
      <div className="list">
        <div className="title">
          <div>최근 회화</div>
          <div
            className="more"
            onClick={() => navigate("/mypage/mychatreport")}
          >
            더보기
          </div>
        </div>
        {data &&
          data.map((each, idx) => {
            if (idx < 4) {
              return (
                <div
                  className="recent"
                  onClick={() => navigate(`/aichatreport/${each.id}`)}
                >
                  <div>{categoryTitles[each.category]}</div>
                  <div>{each.createdAt.slice(0, 10)}</div>
                </div>
              );
            }
          })}
      </div>
    </MyGraphWrapper>
  );
}

export default MyChatGraph;
