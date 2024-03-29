import { IconButton, Menu, MenuItem, Switch } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { HeaderContainer } from "@/styles/Aichat/AiChat";

type Props = {
  aiChatTitle: string;
  options: {
    label: string;
    checked?: boolean;
    onChange?: () => void;
  }[];
};

function ChatHeader({ aiChatTitle, options }: Props) {
  const navigate = useNavigate();
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = () => navigate("/aichatlist");

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
            component="div"
            style={{
              display: "flex",
              // justifyContent: index === 1 ? "flex-end" : "space-between",
            }}
          >
            {index !== options.length - 1 && (
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
            )}
            {index === options.length - 1 && (
              <div
                style={{
                  width: "100%",
                }}
                onClick={() => handleOptionClick()}
              >
                {option.label}
              </div>
            )}
          </MenuItem>
        ))}
      </Menu>
    </HeaderContainer>
  );
}

export default ChatHeader;
