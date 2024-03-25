import { useIsMobile } from "@/stores/displayStore";
import { useButtonActions, useButtonStates } from "@/stores/newsStore";
import { ButtonContainer } from "@/styles/News/Detail/container";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";

// 뉴스 읽기모드 버튼그룹

function NewsButton() {
  const [options, setOptions] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const { isPlaying, isReadKrOn, isReadOn, isTransOn, isTTSReady } =
    useButtonStates();
  const { setIsPlaying, setIsReadKrOn, setIsReadOn, setIsTransOn } =
    useButtonActions();
  const [isScrolling, setIsScrolling] = useState(false);

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

  const scrollHandler = () => {
    setIsScrolling(true);
    return () => setIsScrolling(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <ButtonContainer
      style={{
        left: isMobile ? `calc(50% - 158px)` : `calc(50% - 200px)`,
        opacity: isScrolling ? "0.5" : "1",
      }}
      onMouseOver={() => setIsScrolling(false)}
    >
      <ToggleButtonGroup
        value={options}
        color="purple"
        sx={{ backgroundColor: "var(--bg)" }}
        exclusive
        size={isMobile ? "small" : "medium"}
      >
        <ToggleButton
          onClick={() => setIsPlaying(!isPlaying)}
          value="tts"
          disabled={!isTTSReady}
        >
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
