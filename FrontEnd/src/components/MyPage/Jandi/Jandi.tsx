import { JandiCard } from "@/styles/User/Mypage";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function Jandi() {
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-08-31");
  const values = [
    { date: "2023-01-01", count: 1 },
    { date: "2023-01-02", count: 3 },
    { date: "2023-01-05", count: 3 },
    { date: "2023-01-08", count: 3 },
  ];

  return (
    <div className="jandicontainer">
      <JandiCard>
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
    </div>
  );
}

export default Jandi;
