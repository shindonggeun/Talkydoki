import { Flexbox, Wrapper } from "@/styles/Aichat/ui/AiChat";
import ChatReportCarousel from "../components/Aichat/ChatReport/ChatReportCarousel";

type Props = {};

function AiChatReport({}: Props) {
  return (
    <>
      <Wrapper>
        <Flexbox>
          <ChatReportCarousel />
        </Flexbox>
      </Wrapper>
    </>
  );
}

export default AiChatReport;
