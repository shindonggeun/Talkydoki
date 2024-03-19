import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import { useState } from "react";

type Props = {
  isConfirm: boolean; // 비밀번호 확인인 지?
  password: string; // 비밀번호
  setPassword: React.Dispatch<React.SetStateAction<string>>; // 비밀번호 변경 set 함수
  isDefferent?: boolean; // 비밀번호/비밀번호 확인 유효성 검사 결과 (필수아님)
  error?: string | null; // 에러 있을 시 에러메세지
};

function PasswordInput({
  isConfirm,
  password,
  setPassword,
  isDefferent,
  error,
}: Props) {
  const [isShow, setIsShow] = useState(false);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      color="purple"
      sx={{ margin: "1vh 0" }}
    >
      <InputLabel>{isConfirm ? "비밀번호 확인" : "비밀번호"}</InputLabel>
      <OutlinedInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={isShow ? "text" : "password"}
        error={isDefferent || Boolean(error) ? true : false}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setIsShow((prev) => !prev)}
              onMouseDown={() => setIsShow((prev) => !prev)}
              edge="end"
            >
              {isShow ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {!isConfirm && (
        <FormHelperText>8~16자, 영문, 특수문자 포함</FormHelperText>
      )}
      {isDefferent && (
        <FormHelperText error>정확한 비밀번호를 입력해주세요</FormHelperText>
      )}
      {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

export default PasswordInput;
