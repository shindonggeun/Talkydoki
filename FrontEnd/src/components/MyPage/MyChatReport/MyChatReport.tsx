import { Wrapper } from "@/styles/common/ui/container";
import MyReportCard from "./MyReportCard";
import { ReportContainer } from "@/styles/Mypage/ui";
import { NegativeTitle } from "@/styles/common/ui/text";
import { useGetAllReport } from "@/api/aiChatReportApi";

function MyChatReport() {
  const { data } = useGetAllReport();
  console.log("data", data);

  return (
    <Wrapper>
      <NegativeTitle>AI 채팅 목록</NegativeTitle>

      <ReportContainer>
        {data?.map((report) => (
          <MyReportCard key={report.id} report={report} />
        ))}
      </ReportContainer>
    </Wrapper>
  );
}

export default MyChatReport;
