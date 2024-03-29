import {
  ChatReportCard,
  ChatReportWrapper,
  ChatReportTitleSection,
} from "@/styles/Aichat/AiChatReport";
import ChatReportCarousel from "../components/Aichat/ChatReport/ChatReportCarousel";

type Props = {};

function AiChatReport({}: Props) {
  return (
    <>
      <ChatReportWrapper>
        <ChatReportCard>
          <ChatReportTitleSection>AI 회화 리포트</ChatReportTitleSection>
          <ChatReportCarousel />
        </ChatReportCard>
      </ChatReportWrapper>
    </>
  );
}

export default AiChatReport;
