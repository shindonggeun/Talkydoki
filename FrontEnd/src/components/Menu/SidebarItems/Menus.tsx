import React from "react";
import { MenuDivider, MenuItem } from "@/styles/Menu/sidebar";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import ForumIcon from "@mui/icons-material/Forum";
import FaceIcon from "@mui/icons-material/Face";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile, useSetIsSidebarOpen } from "@/stores/displayStore";

function Menus() {
  const { pathname: now } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const setIsSidebarOpen = useSetIsSidebarOpen();

  // 모바일 환경일 경우 메뉴 이동 시 사이드바 닫힘
  const menuHandler = (route: string) => {
    if (isMobile) setIsSidebarOpen(false);
    navigate(route);
  };

  return (
    <div>
      <MenuDivider textAlign="left">menu</MenuDivider>

      {/* 홈 */}
      <MenuItem
        onClick={() => menuHandler("/main")}
        className={now == "/main" ? "selected" : undefined}
      >
        <div className="label">
          <HomeIcon />
          <div>홈</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
      {/* 뉴스 */}
      <MenuItem
        onClick={() => menuHandler("/news")}
        className={now.startsWith("/news") ? "selected" : undefined}
      >
        <div className="label">
          <ArticleIcon />
          <div>뉴스</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
      {/* AI 채팅 */}
      <MenuItem>
        <div className="label">
          <ForumIcon />
          <div>AI 채팅</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
      {/* 마이페이지 */}
      <MenuItem
        onClick={() => menuHandler("/mypage")}
        className={now.startsWith("/mypage") ? "selected" : undefined}
      >
        <div className="label">
          <FaceIcon />
          <div>마이페이지</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
    </div>
  );
}

export default React.memo(Menus);
