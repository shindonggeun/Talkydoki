import { ProfileSection } from "@/styles/Menu/sidebar";

import Logo from "@/assets/images/logo_text_light.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDisplayAction, useIsDark } from "@/stores/displayStore";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { getProfileImage } from "@/util/common/getFullUrl";
import { useGetMember, useLogout } from "@/api/memberApi";

function SidebarProfile() {
  const isDark = useIsDark();
  const toggleDarkmode = useDisplayAction();
  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();

  const { data, isLoading } = useGetMember();
  const { mutate: logout } = useLogout();

  // const userInfo = typeof(data) ==

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

  if (!data || isLoading) return <></>;

  const { nickname, profileImage } = data;

  return (
    <ProfileSection>
      {/* 로고 */}
      <div className="logoDiv">
        <img className="logoImg" src={Logo} alt="talkydoki" />
        <div className="icons">
          {isDark ? (
            <LightModeIcon className="icon" onClick={() => toggleDarkmode()} />
          ) : (
            <DarkModeIcon className="icon" onClick={() => toggleDarkmode()} />
          )}
          <LogoutIcon className="icon" onClick={handleLogoutModal} />
        </div>
      </div>
      {/* 프로필사진 / 이름 / 로그아웃 */}
      <div className="profileDiv">
        <img
          src={getProfileImage(profileImage)}
          alt="profileImage"
          className="profileImg"
        />
        <div className="name">{nickname}</div>
      </div>
    </ProfileSection>
  );
}

export default SidebarProfile;
