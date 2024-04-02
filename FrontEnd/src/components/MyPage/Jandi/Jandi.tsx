import { useUserAttendance } from "@/api/profileApi";
import { UserAttendanceInterface } from "@/interface/UserInterface";
import { JandiCard } from "@/styles/Mypage/components";
import { JandiStyle } from "@/styles/Mypage/jandi";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactToolTip from "react-tooltip";

function Jandi() {
  const { data } = useUserAttendance();
  const [graphData, setGraphData] = useState<UserAttendanceInterface>({});

  // const d-

  const levelCheck = (count: number) => {
    if (count >= 0 && count < 3) {
      return 0;
    } else if (count < 5) {
      return 1;
    } else if (count < 7) {
      return 2;
    } else if (count < 9) {
      return 3;
    } else if (count >= 9) {
      return 4;
    }
  };

  useEffect(() => {
    if (!data) return;
    setGraphData(data);
  }, [data]);

  // console;
  const year = new Date().getFullYear();
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  return (
    <JandiCard>
      <JandiStyle />
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={Object.values(graphData).reduce(
          (acc: { date: string; count: number }[], current) => {
            acc.push({
              date: current.date,
              count: current.totalCount,
            });
            return acc;
          },
          []
        )}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${levelCheck(value.count)}`;
        }}
        tooltipDataAttrs={(value: { date: string; count: number }) => {
          const attrs = graphData[value.date];
          if (attrs) {
            return {
              "data-tip": `뉴스: ${attrs.news}회 | 회화: ${attrs.chat}회`,
            };
          } else {
            return {
              "data-tip": ``,
            };
          }
        }}
      />
      <ReactToolTip />
    </JandiCard>
  );
}

export default Jandi;
