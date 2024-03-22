import { useButtonActions, useButtonStates } from "@/stores/newsStore";
import { ButtonContainer } from "@/styles/News/Detail/container";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";

// 뉴스 읽기모드 버튼그룹

function NewsButton() {
  const [options, setOptions] = useState<string[]>([]);
  const { isPlaying, isReadKrOn, isReadOn, isTransOn } = useButtonStates();
  const { setIsPlaying, setIsReadKrOn, setIsReadOn, setIsTransOn } =
    useButtonActions();

  useEffect(() => {
    setOptions(() => {
      const arr = [];
      isPlaying && arr.push("tts");
      isTransOn && arr.push("trans");
      isReadOn && arr.push("read");
      isReadKrOn && arr.push("readkr");
      return arr;
    });
  }, [isPlaying, isTransOn, isReadKrOn, isReadOn]);

  return (
    <ButtonContainer>
      <ToggleButtonGroup
        value={options}
        color="purple"
        sx={{ backgroundColor: "var(--bg)" }}
        exclusive
      >
        <ToggleButton onClick={() => setIsPlaying(!isPlaying)} value="tts">
          {isPlaying ? "재생 ❚❚" : "재생 ▶"}
        </ToggleButton>
        <ToggleButton onClick={() => setIsTransOn(!isTransOn)} value="trans">
          번역 보기
        </ToggleButton>
        <ToggleButton onClick={() => setIsReadOn(!isReadOn)} value="read">
          발음 보기(일)
        </ToggleButton>
        <ToggleButton onClick={() => setIsReadKrOn(!isReadKrOn)} value="readkr">
          발음 보기(한)
        </ToggleButton>
      </ToggleButtonGroup>
    </ButtonContainer>
  );
}

export default NewsButton;
