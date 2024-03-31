import { IconButton, Menu, MenuItem, Switch } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { HeaderContainer } from "@/styles/Aichat/ui/AiChat";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";

type Props = {
  aiChatTitle: string;
  options: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }[];
};

function ChatHeader({ aiChatTitle, options }: Props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 모달추가
  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();

  const handleExitModal = () => {
    setModalContent({
      message: "나가시겠습니까?",
      onSuccess: () => {
        setIsModalOn(false);
        navigate("/aichatlist");
      },

      isInfo: false,
    });
    setIsModalOn(true);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer>
      <div>{aiChatTitle}</div>
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
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            component="div"
            style={{
              display: "flex",
              // justifyContent: index === 1 ? "flex-end" : "space-between",
            }}
          >
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
                checked={option.checked}
                onChange={option.onChange}
                color="primary"
              />
            </div>
          </MenuItem>
        ))}
        <MenuItem
          component="div"
          style={{
            display: "flex",
            // justifyContent: index === 1 ? "flex-end" : "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
            }}
            onClick={() => handleExitModal()}
          >
            나가기
          </div>
        </MenuItem>
      </Menu>
    </HeaderContainer>
  );
}

export default ChatHeader;
