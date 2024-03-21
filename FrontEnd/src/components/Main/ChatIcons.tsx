import { IconBox } from "@/styles/Main/iconBox";
import { NegativeTitle } from "@/styles/common/ui/text";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import AIChatCategory from "../ui/AIChatCategory";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useIsDark, useIsMobile } from "@/stores/displayStore";
import { useTheme } from "styled-components";

type Props = {};

// 오늘의 회화 아이콘
function ChatIcons({}: Props) {
  const isMobile = useIsMobile();
  const theme = useTheme();
  const isDark = useIsDark();

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

          {/* 사람 아이콘 */}
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
        <AIChatCategory Icon={AcUnitIcon} title={"눈송이"} />
        <AIChatCategory Icon={AcUnitIcon} title={"눈송이"} />
        <AIChatCategory Icon={AcUnitIcon} title={"눈송이"} />
      </IconBox>
    </>
  );
}

export default ChatIcons;
