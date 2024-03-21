import { IconButton, Menu, MenuItem, Switch } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { HeaderContainer } from "@/styles/Aichat/AiChatRoom";
import { useNavigate } from "react-router-dom";
import { useAiChatStore } from "@/stores/aichatStore";

type Props = {};

function ChatHeader({}: Props) {
  const navigate = useNavigate();

  // 전역 상태 관리
  const globalIsTranslate = useAiChatStore((state) => state.globalIsTranslate);
  const setGlobalIsTranslate = useAiChatStore(
    (state) => state.setGlobalIsTranslate
  );

  // 번역표시 팁표시 기능 추가 필요
  const options = [
    { label: "번역표시" },
    { label: "팁표시" },
    { label: "나가기", action: () => navigate(-1) },
  ];

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick: (action: (() => void) | undefined) => () => void =
    (action) => () => {
      action?.();
      // setAnchorEl(null);
    };

  return (
    <HeaderContainer>
      <div>AI 회화 채팅</div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.label}
            onClick={handleOptionClick(option.action)}
            component="div"
            style={{
              display: "flex",
              // justifyContent: index === 1 ? "flex-end" : "space-between",
            }}
          >
            {index === 0 || index === 1 ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {option.label}
                <Switch
                  checked={globalIsTranslate}
                  onChange={() => setGlobalIsTranslate()}
                  color="primary"
                />
              </div>
            ) : (
              option.label
            )}
          </MenuItem>
        ))}
      </Menu>
    </HeaderContainer>
  );
}

export default ChatHeader;
