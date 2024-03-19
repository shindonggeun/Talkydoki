import { useQueryClient } from "@tanstack/react-query";

import { UpdateProfileContext } from "@/styles/ProfileUpdate/UpdateForm";
import { Button } from "@mui/material";

import { getProfileImage } from "@/util/common/getFullUrl";
import { useEffect, useRef, useState } from "react";
import { useUpdateProfile, useUploadImageFile } from "@/api/profileApi";
import { useGetMember } from "@/api/memberApi";
import { UserInterface } from "@/interface/UserInterface";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  index: number;
  value: number;
  user: UserInterface;
};

function UpdateProfileSection({ index, value, user }: Props) {
  const { email, id, name, nickname, profileImage } = user;

  const originalProfImg = getProfileImage(profileImage); // 기존 프로필 사진 주소
  const [newProfThumb, setNewProfThumb] = useState(originalProfImg); // 썸네일용 프로필 사진
  const [newProfImg, setNewProfImg] = useState(originalProfImg); // 변경된 프로필 사진 주소
  const newProfForm = useRef(new FormData());
  const [newNickname, setNewNickname] = useState(nickname); // 변경된 닉네임

  const { mutate: updateProfile } = useUpdateProfile();
  const {
    mutate: uploadImage,
    data: uploadResult,
    isSuccess,
  } = useUploadImageFile();

  // 업로드 이미지 mutate 완료되면 프로필 이미지 url 설정
  useEffect(() => {
    if (!isSuccess) return;
    if (uploadResult) {
      setNewProfImg(uploadResult.data.dataBody);
    }
  }, [isSuccess]);

  useEffect(() => {
    // 업로드 이미지 mutate 완료 후 프로필 이미지 변경되면 프로필 업데이트
    if (isSuccess) {
      updateProfile({
        nickname: newNickname,
        profileImage: newProfImg,
      });
    }
  }, [newProfImg, isSuccess]);

  if (index != value) return <></>;

  return (
    <UpdateProfileContext role="tabpanel">
      {/* 프로필사진 수정 section */}
      <div className="imageSection">
        <img src={newProfThumb} alt="프로필 이미지" />
        {/* 프로필 사진 변경 폼 */}
        <Button component="label" color="purple" variant="contained">
          파일 업로드
          <input
            type="file"
            accept="image/*"
            className="hiddenInput"
            onChange={(e) => {
              e.preventDefault();
              if (!e.target.files) return;
              const thumbnail = URL.createObjectURL(e.target.files[0]);

              // 썸네일 미리보기 변경
              setNewProfThumb(thumbnail);

              newProfForm.current.append("file", e.target.files[0]);
              newProfForm.current.append(
                "fileName",
                `${id}/profileImage/${new Date().getTime()}`
              );
            }}
          />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            // 변경 취소 버튼 (초기 profile Image로 되돌림)
            setNewProfThumb(originalProfImg);
            setNewProfImg(originalProfImg);
          }}
        >
          되돌리기
        </Button>
        {/* 닉네임 수정 */}
        <input
          type="text"
          value={newNickname}
          // error={Boolean(newNickname.length == 0)}
          onChange={(e) => {
            setNewNickname(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          if (newProfForm.current.get("file")) {
            uploadImage(newProfForm.current);
          }
        }}
      >
        저장
      </button>
    </UpdateProfileContext>
  );
}

export default UpdateProfileSection;
