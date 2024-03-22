import React from "react";
import { ProfileSection } from "@/styles/Menu/sidebar";
import { getProfileImage } from "@/util/common/getFullUrl";
import { useGetMember } from "@/api/memberApi";

function SidebarProfile() {
  const { data, isLoading } = useGetMember();

  if (!data || isLoading) return <></>;

  const { nickname, profileImage } = data;

  return (
    <ProfileSection>
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
