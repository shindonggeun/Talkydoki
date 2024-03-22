import React from "react";
import Logo from "@/assets/images/logo_text_light.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDisplayAction, useIsDark } from "@/stores/displayStore";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { useLogout } from "@/api/memberApi";
import { SidebarTitleSection } from "@/styles/Menu/sidebar";

type Props = {};

function SidebarTitle({}: Props) {
  const isDark = useIsDark();
  const toggleDarkmode = useDisplayAction();
  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();

  const { mutate: logout } = useLogout();

  const handleLogoutModal = () => {
    setModalContent({
      message: "정말 로그아웃하시겠습니까?",
      onSuccess: () => {
        logout();
        setIsModalOn(false);
      },
      isInfo: false,
    });
    setIsModalOn(true);
  };

  return (
    <SidebarTitleSection>
      <img className="logoImg" src={Logo} alt="talkydoki" />
      <div>
        {isDark ? (
          <LightModeIcon className="icon" onClick={() => toggleDarkmode()} />
        ) : (
          <DarkModeIcon className="icon" onClick={() => toggleDarkmode()} />
        )}
        <LogoutIcon className="icon" onClick={handleLogoutModal} />
      </div>
    </SidebarTitleSection>
  );
}

export default React.memo(SidebarTitle);
