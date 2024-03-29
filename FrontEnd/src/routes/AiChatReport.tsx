import { ChatCard, ChatWrapper } from "@/styles/Aichat/AiChat";
import ChatReportCarousel from "../components/Aichat/ChatReport/ChatReportCarousel";

type Props = {};

function AiChatReport({}: Props) {
  return (
    <>
      <ChatWrapper>
        <ChatCard>
          <ChatReportCarousel />
        </ChatCard>
      </ChatWrapper>
    </>
  );
}

export default AiChatReport;
