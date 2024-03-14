import { NavbarWrapper } from "@/styles/common/ui/container";
import { Inner } from "@/styles/Menu/navbar";
import Logo from "@/assets/images/logo_face2.png";
import { useIsSidebarOpen, useSetIsSidebarOpen } from "@/stores/displayStore";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {};

function Navbar({}: Props) {
  const isSidebarOpen = useIsSidebarOpen();
  const toggleSidebar = useSetIsSidebarOpen();

  return (
    <NavbarWrapper>
      <Inner>
        <img className="logo" src={Logo} alt="logo" />
        <MenuIcon
          className="menuToggle"
          onClick={() => toggleSidebar(!isSidebarOpen)}
        />
        {/* <button onClick={() => toggleSidebar(!isSidebarOpen)}>asdfdsfdf</button> */}
      </Inner>
    </NavbarWrapper>
  );
}

export default Navbar;
