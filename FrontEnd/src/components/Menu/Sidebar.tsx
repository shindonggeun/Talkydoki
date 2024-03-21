import { useEffect } from "react";
import SidebarProfile from "./SidebarItems/SidebarProfile";

import { SidebarWrapper } from "@/styles/common/ui/container";
import { MenuDivider, SidebarBackground } from "@/styles/Menu/sidebar";
import {
  useIsMobile,
  useIsSidebarOpen,
  useSetIsMobile,
  useSetIsSidebarOpen,
} from "@/stores/displayStore";
import Menus from "./SidebarItems/Menus";
import SidebarTitle from "./SidebarItems/SidebarTitle";

function Sidebar() {
  const isSidebarOpen = useIsSidebarOpen();
  const setIsSidebarOpen = useSetIsSidebarOpen();
  const isMobile = useIsMobile();
  const setIsMobile = useSetIsMobile();

  // 화면 폭 줄어들면 접히는 함수
  const resizeHandler = () => {
    setIsMobile(window.innerWidth < 992 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

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
        <MenuDivider textAlign="left">menu</MenuDivider>
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
