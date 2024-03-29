import { IntroSidebarWrapper } from "@/styles/Intro/containers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisplayAction, useIsDark } from "@/stores/displayStore";

import TextLogo from "@/assets/images/logo_text_light.png";
import { Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

type Props = {};

function IntroSidebar({}: Props) {
  const [isHead, setIsHead] = useState(true);
  const navigate = useNavigate();
  const isDark = useIsDark();
  const toggleDarkmode = useDisplayAction();

  const checkScroll = () => {
    if (window.scrollY > window.innerHeight * 2) {
      setIsHead(false);
    } else {
      setIsHead(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHead]);

  return (
    <IntroSidebarWrapper
      style={{
        backdropFilter: isHead
          ? undefined
          : "blur(4px) brightness(1.3) grayscale(0.3)",
        WebkitBackdropFilter: isHead
          ? undefined
          : "blur(4px) brightness(1.3) grayscale(0.3)",
      }}
    >
      <img src={TextLogo} alt="logo" className="textLogo" />
      <div>
        <Button
          variant="contained"
          color="purple"
          disableElevation
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>
        <Button
          variant="outlined"
          color="purple"
          // sx={{ backgroundColor: "rgb(255, 255, 255, 0.4)" }}
          onClick={() => navigate("/signup")}
        >
          회원가입
        </Button>
        {isDark ? (
          <LightModeIcon
            className="icon"
            onClick={() => toggleDarkmode(false)}
          />
        ) : (
          <DarkModeIcon className="icon" onClick={() => toggleDarkmode(true)} />
        )}
      </div>
    </IntroSidebarWrapper>
  );
}

export default IntroSidebar;
