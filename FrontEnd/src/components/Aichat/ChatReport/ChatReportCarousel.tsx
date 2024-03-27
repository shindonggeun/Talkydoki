import { useState } from "react";
import {
  ChatReportCarouselItem,
  ChatReportCarouselSection,
} from "../../../styles/Aichat/AiChatReport";
import ChatReportChart from "./ChatReportChart";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { chatReportResponseInterface } from "@/interface/AiChatReportInterface";
import ChatReportChatFeadback from "./ChatReportChatFeadback";

function ChatReportCarousel() {
  const [now, setNow] = useState(0);
  const report: chatReportResponseInterface = {
    reportDetail: {
      id: 1,
      category: "GLOBAL",
      conversationSummary: "사용자가 일상적인 활동에 대해 일본어로 대화하는 중",
      vocabularyScore: 3.5,
      grammarScore: 2,
      wordScore: 4.5,
      FluencyScore: 5,
      ContextScore: 1,
    },
    chatsWithFeedback: [
      {
        chatId: 1,
        sender: "USER",
        message: "お菓子を買う",
        feedback: null,
      },
      {
        chatId: 2,
        sender: "GPT",
        message: "いいえ",
        feedback: null,
      },
      {
        chatId: 3,
        sender: "USER",
        message: "ユーザー:なぜいいえ、買ってください。",
        feedback: "자연스러운 대화로서 의도를 명확하게 전달하고 있습니다.",
      },
      {
        chatId: 4,
        sender: "GPT",
        message: "いいえ",
        feedback: null,
      },
      {
        chatId: 5,
        sender: "USER",
        message: "家に帰らない",
        feedback: null,
      },
      {
        chatId: 6,
        sender: "GPT",
        message: "不機嫌にならないで",
        feedback: null,
      },
    ],
  };
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
          <ChatReportChart reportDetail={report.reportDetail} />
        </ChatReportCarouselItem>
        <ChatReportCarouselItem>
          <ChatReportChatFeadback
            chatsWithFeedback={report.chatsWithFeedback}
          />
        </ChatReportCarouselItem>
      </div>
    </ChatReportCarouselSection>
  );
}

export default ChatReportCarousel;
