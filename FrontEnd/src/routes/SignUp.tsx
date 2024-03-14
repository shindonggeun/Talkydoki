import { useSignup } from "@/api/memberApi";
import { SignupParams } from "@/interface/AuthInterface";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  ButtonBox,
  // EmailDiv,
  // EmailInput,
  FlexBox,
  SignupBox,
  SingupInputBox,
  SocialButtonDiv,
  Title,
} from "@/styles/User/SignUp";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [formData, setFormData] = useState<SignupParams>({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const { mutate: signup } = useSignup();
  // 비밀번호 토글
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // const handleClickShowPasswordConfirm = () => {
  //   setShowPassword(!showPassword);
  // };
  // 비밀번호 마우스 포커스 방지
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 회원가입요청 보내는 코드
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    signup(formData);
  };

  return (
    <FlexBox>
      <SignupBox>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <SingupInputBox>
            <TextField
              label="아이디"
              variant="outlined"
              color="purple"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                width: "72%",
                marginBottom: "5%",
                backgroundColor: "var(--bg-modal)",
              }}
              size="small"
            />
            <TextField
              label="닉네임"
              variant="outlined"
              color="purple"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              sx={{
                width: "72%",
                marginBottom: "5%",
                backgroundColor: "var(--bg-modal)",
              }}
              size="small"
            />
            <TextField
              label="이름"
              variant="outlined"
              color="purple"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{
                width: "72%",
                marginBottom: "5%",
                backgroundColor: "var(--bg-modal)",
              }}
              size="small"
            />
            {/* 이메일 부분 사용시 주석해제 */}
            {/* <EmailDiv>
              <TextField
                label="이메일"
                variant="outlined"
                color="purple"
                sx={{ width: "70%", backgroundColor: "var(--bg-modal)" }}
              />

              <Button
                variant="contained"
                color="purple"
                size="small"
                sx={{ width: "10%", height: "100%" }}
              >
                버튼
              </Button>
            </EmailDiv>
            <EmailDiv>
              <TextField
                label="인증번호"
                variant="outlined"
                color="purple"
                sx={{ width: "70%", backgroundColor: "var(--bg-modal)" }}
              />
              <Button
                variant="contained"
                color="purple"
                size="small"
                sx={{ height: "100%" }}
              >
                버튼
              </Button>
            </EmailDiv> */}

            <FormControl
              sx={{
                width: "72%",
                marginBottom: "5%",
                backgroundColor: "var(--bg-modal)",
              }}
              variant="outlined"
              size="small"
              color="purple"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                비밀번호
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            {/* <FormControl 비밀번호 확인 부분 제작 및 컴포넌트로 빼서 관리필요
              sx={{
                width: "72%",
                marginBottom: "5%",
                backgroundColor: "var(--bg-modal)",
              }}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                비밀번호확인
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPasswordConfirm ? "text" : "passwordConfirm"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                // value={password}
                // onChange={(e) => {
                //   console.log(e.target.value); // 이제 여기서만 비밀번호 입력 값이 콘솔에 로그됩니다.
                //   setPasswordConfirm(e.target.value);
                // }}
              />
            </FormControl> */}
          </SingupInputBox>
          <ButtonBox>
            <Button
              type="submit"
              variant="contained"
              color="purple"
              size="small"
              sx={{ width: "72%" }}
            >
              회원가입
            </Button>
            <SocialButtonDiv>
              <Button variant="contained" color="purple" size="small">
                네이버
              </Button>
              <Button variant="contained" color="purple" size="small">
                카카오
              </Button>
              <Button variant="contained" color="purple" size="small">
                구글
              </Button>
            </SocialButtonDiv>
            <p>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                로그인
              </Link>
            </p>
          </ButtonBox>
        </form>
      </SignupBox>
    </FlexBox>
  );
};

export default SignUp;
