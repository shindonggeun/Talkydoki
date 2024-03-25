import { NewsWidget } from "@/styles/News/Detail/container";
import WidgetGraph from "./ui/WidgetGraph";
import { KeywordItem } from "@/styles/News/Detail/ui";
import { Button } from "@mui/material";
import { useIsMobile } from "@/stores/displayStore";

type Props = {
  keywords: { [keyword: string]: number };
  isReadMode: boolean;
  setIsReadMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideWidget({ keywords, isReadMode, setIsReadMode }: Props) {
  const isMobile = useIsMobile();

  return (
    <NewsWidget>
      <div className="title">🔥자주 나온 단어🔥</div>
      {!isMobile && <WidgetGraph keyword={keywords} />}
      <div className="keywordSection">
        {Object.entries(keywords).map(([key, value]) => (
          <KeywordItem key={key}>
            {key} <span>{value}</span>
          </KeywordItem>
        ))}
      </div>
      <Button
        variant={isReadMode ? "contained" : "outlined"}
        color="purple"
        fullWidth
        disableElevation
        onClick={() => setIsReadMode((prev) => !prev)}
      >
        {isReadMode ? "학습모드" : "읽기모드"}
      </Button>
    </NewsWidget>
  );
}

export default SideWidget;
