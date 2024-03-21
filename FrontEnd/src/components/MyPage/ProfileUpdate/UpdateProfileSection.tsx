import { UpdateProfileContext } from "@/styles/ProfileUpdate/UpdateForm";
import { Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";

import { getProfileImage } from "@/util/common/getFullUrl";
import { useEffect, useRef, useState } from "react";
import { useUpdateProfile, useUploadImageFile } from "@/api/profileApi";
import { UserInterface } from "@/interface/UserInterface";
import { isValidImage } from "@/util/common/validator";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";

type Props = {
  children?: React.ReactNode;
  index: number;
  value: number;
  user: UserInterface;
};

function UpdateProfileSection({ index, value, user }: Props) {
  const { email, name, id, nickname, profileImage } = user;

  const originalProfImg = getProfileImage(profileImage); // 기존 프로필 사진 주소
  const [newProfThumb, setNewProfThumb] = useState(originalProfImg); // 썸네일용 프로필 사진
  const [newProfImg, setNewProfImg] = useState(originalProfImg); // 변경된 프로필 사진 주소
  const [newNickname, setNewNickname] = useState(nickname); // 변경된 닉네임
  const newProfForm = useRef(new FormData());

  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();

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

  const handleSave = () => {
    setModalContent({
      message: "프로필을 저장중입니다...",
      isInfo: true,
      isReadOnly: true,
    });
    setIsModalOn(true);

    if (newProfForm.current.get("file")) {
      uploadImage(newProfForm.current);
    } else {
      updateProfile({
        nickname: newNickname,
        profileImage: profileImage,
      });
    }
  };

  if (index != value) return <></>;

  return (
    <UpdateProfileContext role="tabpanel">
      {/* 프로필사진 수정 section */}
      <div className="imageSection">
        <img src={newProfThumb} alt="프로필 이미지" />

        {/* 프로필 사진 변경 폼 */}
        <Button component="label" color="purple" variant="contained" fullWidth>
          파일 업로드
          <input
            type="file"
            accept="image/*"
            className="hiddenInput"
            onChange={(e) => {
              e.preventDefault();
              if (!e.target.files) return;

              // 유효성 검사
              if (!isValidImage(e.target.files[0])) {
                setModalContent({
                  message: "지원하지 않는 파일 형식입니다.",
                  isInfo: true,
                });
                setIsModalOn(true);
                return;
              }
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
          fullWidth
          onClick={() => {
            // 변경 취소 버튼 (초기 profile Image로 되돌림)
            setNewProfThumb(originalProfImg);
            setNewProfImg(originalProfImg);
          }}
        >
          되돌리기
        </Button>
        <div className="label">.jpg, .jpeg, .png 확장자만 사용 가능</div>
      </div>

      {/* 닉네임 수정칸 */}
      <div className="infoSection">
        <div className="inputGroup">
          <Divider textAlign="left">개인정보 수정</Divider>
          <TextField label="이메일" defaultValue={email} disabled fullWidth />
          <TextField label="이름" defaultValue={name} disabled fullWidth />
          <TextField
            fullWidth
            label="닉네임"
            color="purple"
            value={newNickname}
            onChange={(e) => {
              setNewNickname(e.target.value);
            }}
            error={Boolean(newNickname.length == 0)}
            helperText={
              newNickname.length == 0 ? "닉네임은 비워둘 수 없습니다" : false
            }
          />
        </div>
        <div className="inputGroup">
          <Button
            variant="contained"
            color="purple"
            fullWidth
            onClick={() => handleSave()}
          >
            저장
          </Button>
        </div>
      </div>
    </UpdateProfileContext>
  );
}

export default UpdateProfileSection;
