import { IconBox } from "@/styles/Main/iconBox";
import { NegativeTitle } from "@/styles/common/ui/text";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import ChatCategory from "../ui/AIChatCategory";
import { useIsDark, useIsMobile } from "@/stores/displayStore";
import { useTheme } from "styled-components";

type Props = {};

const categories = [
  {
    iconId: 1,
    title: "호텔 체크인하기",
    category: "HOTEL_CHECK_IN",
  },
  { iconId: 2, title: "축구 대화 하기", category: "SOCCER_CONVERSATION" },
  { iconId: 3, title: "햄버거 주문하기", category: "ORDER_HAMBURGER" },
  { iconId: 4, title: "미용실에서 머리자르기", category: "HAIRCUT_AT_SALON" },
  {
    iconId: 5,
    title: "병원에서 몸상태 말하기",
    category: "DESCRIBE_HEALTH_CONDITION_AT_HOSPITAL",
  },
  {
    iconId: 6,
    title: "경찰서에서 분실물 찾기",
    category: "FIND_LOST_ITEM_AT_POLICE_STATION",
  },
  {
    iconId: 7,
    title: "사회적 토론하기",
    category: "ENGAGE_IN_SOCIAL_DISCUSSION",
  },
  { iconId: 8, title: "동료와 친해지기", category: "BEFRIEND_A_COLLEAGUE" },
  { iconId: 9, title: "브런치 식사 대화하기", category: "BRUNCH_CONVERSATION" },
];

function getRandomCategories() {
  const shuffled = categories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

// 오늘의 회화 아이콘
function ChatIcons({}: Props) {
  const isMobile = useIsMobile();
  const theme = useTheme();
  const isDark = useIsDark();

  const randomCategories = getRandomCategories();
  return (
    <>
      {isMobile ? <NegativeTitle>오늘의 회화</NegativeTitle> : null}
      <IconBox>
        <div className="titleBox">
          {isMobile ? null : (
            <>
              <NegativeTitle className="title">오늘의</NegativeTitle>
              <NegativeTitle className="title">회화</NegativeTitle>
            </>
          )}

          <div className="icon">
            <svg width={0} height={0}>
              <radialGradient id="gradient_shadow">
                <stop offset={0} stopColor="var(--shadow)" stopOpacity={0.9} />
                <stop
                  offset={1}
                  stopColor="var(--shadow-dark)"
                  stopOpacity={0.7}
                />
              </radialGradient>
            </svg>
            <RecordVoiceOverOutlinedIcon
              style={{
                fill: isDark ? `${theme.main.dark}` : "url(#gradient_shadow)",
                opacity: 0.9,
              }}
            />
          </div>
        </div>
        {randomCategories.map((cat, idx) => (
          <ChatCategory
            key={idx}
            iconId={cat.iconId}
            title={cat.title}
            Category={cat.category}
          />
        ))}
      </IconBox>
    </>
  );
}

export default ChatIcons;
