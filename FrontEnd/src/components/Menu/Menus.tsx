import { MenuItem } from "@/styles/Menu/sidebar";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import ForumIcon from "@mui/icons-material/Forum";
import FaceIcon from "@mui/icons-material/Face";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLocation, useNavigate } from "react-router-dom";

function Menus() {
  const { pathname: now } = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <MenuItem
        onClick={() => navigate("/main")}
        className={now == "/main" ? "selected" : undefined}
      >
        <div className="label">
          <HomeIcon />
          <div>홈</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
      <MenuItem
        onClick={() => navigate("/news")}
        className={now == "/news" ? "selected" : undefined}
      >
        <div className="label">
          <ArticleIcon />
          <div>뉴스</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
      <MenuItem>
        <div className="label">
          <ForumIcon />
          <div>AI 채팅</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
      <MenuItem>
        <div className="label">
          <FaceIcon />
          <div>마이페이지</div>
        </div>
        <KeyboardArrowRightIcon />
      </MenuItem>
    </div>
  );
}

export default Menus;
