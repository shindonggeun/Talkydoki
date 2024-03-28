import { useState } from "react";
import {
  ChatReportCarouselItem,
  ChatReportCarouselSection,
} from "../../../styles/Aichat/AiChatReport";
import ChatReportChart from "./ChatReportChart";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ChatReportChatFeadback from "./ChatReportChatFeadback";
import { useGetReport } from "@/api/aiChatReportApi";

function ChatReportCarousel() {
  const [now, setNow] = useState(0);
  const { data } = useGetReport(1);
  const changeCarousel = (pageNum: number) => {
    setNow(pageNum);
  };
  return (
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
          {data && <ChatReportChart reportDetail={data.reportDetail} />}
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
  );
}

export default ChatReportCarousel;
