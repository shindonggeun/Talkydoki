import { NewsWidget } from "@/styles/News/Detail/container";
import WidgetGraph from "./ui/WidgetGraph";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";

import Select from "@mui/material/Select";
import {
  useIsPlaying,
  useNewsSpeed,
  useSetNewsSpeed,
} from "@/stores/newsStore";

type Props = {
  keywords: { [keyword: string]: { count: number; read: string } };
  isReadMode: boolean;
  setIsReadMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideWidget({ keywords, isReadMode, setIsReadMode }: Props) {
  const playSpeed = useNewsSpeed();
  const setPlaySpeed = useSetNewsSpeed();
  const { isPlaying, isPlayingEach } = useIsPlaying();

  return (
    <NewsWidget>
      <div className="title">🔥자주 나온 단어🔥</div>
      <WidgetGraph keyword={keywords} />

      {/* 음원 재생 속도 선택 */}
      <FormControl fullWidth color="purple" className="speedChanger">
        <InputLabel id="demo-simple-select-standard-label">
          재생 속도
        </InputLabel>
        <Select
          disabled={isPlaying || isPlayingEach}
          size="small"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={playSpeed}
          onChange={(e) => setPlaySpeed(Number(e.target.value))}
          label="재생 속도"
        >
          <MenuItem value={0.5}>× 0.5</MenuItem>
          <MenuItem value={0.7}>× 0.7</MenuItem>
          <MenuItem value={1}>보통</MenuItem>
          <MenuItem value={1.5}>× 1.5</MenuItem>
        </Select>
      </FormControl>
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
