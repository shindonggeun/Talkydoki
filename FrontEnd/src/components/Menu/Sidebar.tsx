import { useEffect } from "react";
import SidebarProfile from "./SidebarItems/SidebarProfile";

import { SidebarWrapper } from "@/styles/common/ui/container";
import { SidebarBackground } from "@/styles/Menu/sidebar";
import {
  useIsMobile,
  useIsSidebarOpen,
  useSetIsSidebarOpen,
} from "@/stores/displayStore";
import Menus from "./SidebarItems/Menus";
import SidebarTitle from "./SidebarItems/SidebarTitle";

function Sidebar() {
  const isSidebarOpen = useIsSidebarOpen();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <SidebarWrapper style={isSidebarOpen ? { left: 0 } : { left: "-300px" }}>
        <SidebarTitle />
        <SidebarProfile />
        <Menus />
      </SidebarWrapper>
      {isMobile && isSidebarOpen ? (
        // 모바일버전 사이드바 활성화 시 화면 어둡게
        <SidebarBackground onClick={() => setIsSidebarOpen(false)} />
      ) : null}
    </>
  );
}

export default Sidebar;
