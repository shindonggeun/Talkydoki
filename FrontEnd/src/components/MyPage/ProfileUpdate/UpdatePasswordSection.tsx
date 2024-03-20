import { useDeleteAccount } from "@/api/memberApi";
import { usePasswordChange } from "@/api/profileApi";
import PasswordInput from "@/components/ui/PasswordInput";
import { useIsMobile } from "@/stores/displayStore";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { usePasswordErrors } from "@/stores/signUpStore";
import { UpdatePwContext } from "@/styles/ProfileUpdate/UpdateForm";
import { isSamePassword, isValidPWChange } from "@/util/common/validator";
import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function UpdatePasswordSection({ index, value }: Props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [isDefferent, setIsDefferent] = useState(false);

  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();
  const isMobile = useIsMobile();

  const { changePasswordCheckError, changePasswordError } = usePasswordErrors();
  const { mutate: changePassword } = usePasswordChange();
  const { mutate: deleteAccount } = useDeleteAccount();

  useEffect(() => {
    setIsDefferent(!isSamePassword(newPassword, newPassword2));
  }, [newPassword2]);

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changePassword({
      nowPassword: oldPassword,
      changePassword: newPassword,
      changePasswordCheck: newPassword2,
    });
  };

  if (index != value) return <></>;
  return (
    <UpdatePwContext>
      {/* 비밀번호 변경 section */}
      <div className="section password">
        <div className="title">비밀번호 변경</div>
        <Divider flexItem orientation="vertical" />
        <form onSubmit={handleChangePassword} className="form">
          <div>
            <PasswordInput
              password={oldPassword}
              setPassword={setOldPassword}
              isConfirm={false}
            />
            <PasswordInput
              password={newPassword}
              setPassword={setNewPassword}
              isConfirm={true}
              error={changePasswordError}
            />
            <PasswordInput
              password={newPassword2}
              setPassword={setNewPassword2}
              isConfirm={true}
              isDefferent={isDefferent}
              error={changePasswordCheckError}
            />
          </div>
          <Button
            variant="contained"
            color="purple"
            disabled={!isValidPWChange(oldPassword, newPassword, newPassword2)}
            type="submit"
          >
            수정하기
          </Button>
        </form>
      </div>

      {/* 회원 탈퇴 section */}
      <div className="section quit">
        <div className="title">회원 탈퇴</div>
        <Button
          fullWidth={isMobile}
          className="quit"
          variant="outlined"
          color="error"
          // 탈퇴버튼 클릭 시 모달 on
          onClick={() => {
            setModalContent({
              message: "탈퇴 후 복구할 수 없습니다. 정말 탈퇴하시겠습니까?",
              onSuccess: () => {
                deleteAccount();
              },
              isInfo: false,
            });
            setIsModalOn(true);
          }}
        >
          탈퇴하기
        </Button>
      </div>
    </UpdatePwContext>
  );
}

export default UpdatePasswordSection;
