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
import ChatHeader from "../ChatHeader";
import { useAiChatStore } from "@/stores/aichatStore";

function ChatReportCarousel() {
  const [now, setNow] = useState(0);
  const { data } = useGetReport(1);
  const changeCarousel = (pageNum: number) => {
    setNow(pageNum);
  };
  const { globalIsFeadback, setglobalIsFeadback } = useAiChatStore();
  // 번역표시 팁표시 기능 추가 필요
  const options = [
    {
      label: "피드백 표시",
      checked: globalIsFeadback,
      onChange: () => setglobalIsFeadback(),
    },
    { label: "나가기" },
  ];

  return (
    <>
      <ChatHeader aiChatTitle="AI 회화 채팅 리포트" options={options} />
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
    </>
  );
}

export default ChatReportCarousel;
