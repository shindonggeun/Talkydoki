import { JandiCard } from "@/styles/Mypage/components";
import { JandiStyle } from "@/styles/Mypage/jandi";
import CalendarHeatmap from "react-calendar-heatmap";

function Jandi() {
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-09-30");
  const values = [
    { date: "2023-01-01", count: 1 },
    { date: "2023-01-02", count: 2 },
    { date: "2023-01-05", count: 3 },
    { date: "2023-01-08", count: 4 },
  ];

  return (
    <JandiCard>
      <JandiStyle />
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        // showWeekdayLabels={true}
        //   onClick={(value) => alert(`Clicked on ${value.date}`)}
      />
    </JandiCard>
  );
}

export default Jandi;
