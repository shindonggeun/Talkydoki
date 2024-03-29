import React from "react";
import { NavbarWrapper } from "@/styles/common/ui/container";
import { Inner } from "@/styles/Menu/navbar";
import Logo from "@/assets/images/logo_face2.png";
import { useIsSidebarOpen, useSetIsSidebarOpen } from "@/stores/displayStore";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const isSidebarOpen = useIsSidebarOpen();
  const toggleSidebar = useSetIsSidebarOpen();
  const naviagte = useNavigate();

  return (
    <NavbarWrapper>
      <Inner>
        <MenuIcon
          className="menuToggle"
          onClick={() => toggleSidebar(!isSidebarOpen)}
        />
        <img
          className="logo"
          src={Logo}
          alt="logo"
          onClick={() => naviagte("/")}
        />
        {/* <button onClick={() => toggleSidebar(!isSidebarOpen)}>asdfdsfdf</button> */}
      </Inner>
    </NavbarWrapper>
  );
}

export default React.memo(Navbar);
