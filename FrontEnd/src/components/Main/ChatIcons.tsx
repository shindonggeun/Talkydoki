import { IconBox } from "@/styles/Main/iconBox";
import { NegativeTitle } from "@/styles/common/ui/text";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import AIChatCategory from "../ui/AIChatCategory";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useIsMobile } from "@/stores/displayStore";

type Props = {};

// 오늘의 회화 아이콘
function ChatIcons({}: Props) {
  const isMobile = useIsMobile();

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
                <stop offset={0} stopColor="var(--shadow)" stopOpacity={0.8} />
                <stop
                  offset={1}
                  stopColor="var(--shadow-dark)"
                  stopOpacity={0.6}
                />
              </radialGradient>
            </svg>
            <RecordVoiceOverOutlinedIcon
              style={{
                fill: "url(#gradient_shadow)",
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
