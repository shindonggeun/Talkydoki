import React from "react";
import { ProfileSection } from "@/styles/Menu/sidebar";
import { getProfileImage } from "@/util/common/getFullUrl";
import { useGetMember } from "@/api/memberApi";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

function SidebarProfile() {
  const { data, isLoading } = useGetMember();
  const navigate = useNavigate();

  if (!data || isLoading) return <></>;

  const { nickname, profileImage } = data;

  return (
    <ProfileSection>
      <div className="link" onClick={() => navigate("/userUpdate")}>
        <PersonIcon sx={{ fontSize: "12pt", marginRight: "2px" }} />
        마이페이지
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

export default React.memo(SidebarProfile);
