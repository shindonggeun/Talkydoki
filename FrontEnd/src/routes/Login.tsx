import { useLogin } from "@/api/memberApi";
import { useSetIsSidebarOpen } from "@/stores/displayStore";
import {
  LoginHeader,
  LoginMain,
  LoginFooter,
  FlexBox,
  LoginBox,
  LoginInputDiv,
  SocialButtonDiv,
  Title,
  LoginMainFooter,
} from "@/styles/User/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const setIsSidebarOpen = useSetIsSidebarOpen();

  // 비밀번호 토글
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // 비밀번호 마우스 포커스 방지
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  //   사이드바 감추기
  useEffect(() => {
    setIsSidebarOpen(false);
  });

  return (
    <FlexBox>
      <form onSubmit={handleLogin}>
        <LoginBox>
          <LoginHeader>
            <Title>로그인</Title>
          </LoginHeader>
          <LoginMain>
            <LoginInputDiv>
              <TextField
                label="아이디"
                variant="outlined"
                color="purple"
                sx={{
                  width: "100%",
                  backgroundColor: "var(--bg-modal)",
                }}
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LoginInputDiv>

            <LoginInputDiv>
              <FormControl
                sx={{
                  width: "100%",
                  backgroundColor: "var(--bg-modal)",
                }}
                variant="outlined"
                size="small"
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
                  value={password}
                  onChange={(e) => {
                    console.log(e.target.value); // 이제 여기서만 비밀번호 입력 값이 콘솔에 로그됩니다.
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
            </LoginInputDiv>
            <LoginMainFooter>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                회원가입
              </Link>
            </LoginMainFooter>
          </LoginMain>
          <LoginFooter>
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
            <Button
              type="submit"
              variant="contained"
              color="purple"
              size="small"
              sx={{ width: "72%" }}
            >
              로그인
            </Button>
          </LoginFooter>
        </LoginBox>
      </form>
    </FlexBox>
  );
}

export default Login;
