import { ReportCard } from "@/styles/Mypage/ui";
import { useNavigate } from "react-router";
import ChatReportChart from "@/components/ui/ChatReportChart";
import { Report } from "@/interface/AiChatReportInterface";

type Props = {
  report: Report;
};

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

function MyReportCard({ report }: Props) {
  const navigate = useNavigate();
  const summaryText = `${report.conversationSummary.substring(0, 30)}...`;
  const categoryTitle =
    categoryTitles[report.category] || "알 수 없는 카테고리";
  const averageScore = (
    (report.grammarScore +
      report.wordScore +
      report.FluencyScore +
      report.ContextScore +
      report.vocabularyScore) /
    5
  ).toFixed(2);
  return (
    <ReportCard
      onClick={() => {
        navigate(`/aichatreport/${report.id}`, {
          state: { redirect: "/mypage/mychatreport" },
        });
      }}
    >
      <div className="chatdiv">
        <ChatReportChart reportDetail={report} showLegend={false} />
      </div>
      <div className="textdiv">
        <div style={{ fontSize: "14pt" }}>{categoryTitle}</div>
        <div>요약:{summaryText}</div>

        <div>평균점수:{averageScore}</div>

        <div>날짜:{report.createdAt.substring(0, 10)}</div>
      </div>
    </ReportCard>
  );
}

export default MyReportCard;
