import { useState } from "react";
import {
  ChatReportCarouselItem,
  ChatReportCarouselSection,
  ChatReportFooter,
  DoneButton,
} from "../../../styles/Aichat/AiChatReport";
import ChatReportChart from "@/components/ui/ChatReportChart";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ChatReportChatFeadback from "./ChatReportChatFeadback";
import { useGetReport } from "@/api/aiChatReportApi";
import { useAiChatStore } from "@/stores/aichatStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChatContainer } from "@/styles/Aichat/ui/AiChat";
import { HeaderContainer } from "@/styles/Aichat/AiChatRoom";
import { Switch } from "@mui/material";

function ChatReportCarousel() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.redirect || "/main";
  const { reportId } = useParams<{ reportId: string | undefined }>();
  const [now, setNow] = useState(0);
  const { data } = useGetReport(Number(reportId));
  const changeCarousel = (pageNum: number) => {
    setNow(pageNum);
  };
  const { globalIsFeadback, setglobalIsFeadback } = useAiChatStore();

  return (
    <>
      <ChatContainer>
        <HeaderContainer>
          <div>AI 회화 채팅 리포트</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            피드백 표시
            <Switch
              checked={globalIsFeadback}
              onChange={() => setglobalIsFeadback()}
              color="primary"
            />
          </div>
        </HeaderContainer>
        <ChatReportCarouselSection>
          <div className="carousel-btn-wrapper">
            <div
              className={`carousel-btn-container ${
                now === 0 ? "left-btn" : "right-btn"
              }`}
            >
              {now !== 0 && (
                <div className="carousel-btn" onClick={() => changeCarousel(0)}>
                  <ArrowCircleLeftOutlinedIcon />
                </div>
              )}
              {now !== 1 && (
                <div className="carousel-btn" onClick={() => changeCarousel(1)}>
                  <ArrowCircleRightOutlinedIcon />
                </div>
              )}
            </div>
          </div>
          <div className="track" style={{ left: `${now * -100}%` }}>
            {/* 캐러셀 내용물 컨테이너 */}
            <ChatReportCarouselItem>
              {data && (
                <ChatReportChart
                  reportDetail={data.reportDetail}
                  showLegend={true}
                />
              )}
            </ChatReportCarouselItem>
            <ChatReportCarouselItem>
              {data && (
                <ChatReportChatFeadback
                  chatsWithFeedback={data.chatsWithFeedback}
                />
              )}
            </ChatReportCarouselItem>
          </div>
        </ChatReportCarouselSection>
        <ChatReportFooter>
          <div className="conversation-summary">
            {data && data.reportDetail.conversationSummary}
          </div>
          <DoneButton onClick={() => navigate(redirect)}>확인</DoneButton>
        </ChatReportFooter>
      </ChatContainer>
    </>
  );
}

export default ChatReportCarousel;
