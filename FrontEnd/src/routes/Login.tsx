import { useLogin } from "@/api/memberApi";
import GoogleIcon from "@/assets/icon/google.png";
import KakaoIcon from "@/assets/icon/kakao.png";
import NaverIcon from "@/assets/icon/naver.png";

import {
  AuthMain,
  AuthFooter,
  FlexBox,
  AuthContainer,
  SocialButtonDiv,
  Title,
  AuthMainFooter,
} from "@/styles/User/AuthForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 토글
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // 비밀번호 마우스 포커스 방지
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <FlexBox>
      <form onSubmit={handleLogin}>
        <AuthContainer>
          <Title>로그인</Title>
          <AuthMain>
            {/* 아이디 */}
            <TextField
              label="이메일"
              variant="outlined"
              color="purple"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl fullWidth variant="outlined" color="purple">
              <InputLabel htmlFor="password">비밀번호</InputLabel>
              <OutlinedInput
                id="password"
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
                  setPassword(e.target.value);
                }}
              />
            </FormControl>

            {/* 회원가입 */}
            <AuthMainFooter>
              <div>
                아이디가 없으신가요?{" "}
                <Link className="link" to="/signup">
                  회원가입
                </Link>
              </div>
            </AuthMainFooter>
          </AuthMain>
          <Divider textAlign="center">or</Divider>

          {/* 소셜로그인 */}
          <AuthFooter>
            <SocialButtonDiv>
              <div className="social">
                <img className="icon" src={GoogleIcon} alt="구글로 로그인" />
              </div>
              <div className="social">
                <img className="icon" src={KakaoIcon} alt="카카오로 로그인" />
              </div>
              <div className="social">
                <img className="icon" src={NaverIcon} alt="네이버로 로그인" />
              </div>
            </SocialButtonDiv>
            <Button type="submit" variant="contained" color="purple" fullWidth>
              로그인
            </Button>
          </AuthFooter>
        </AuthContainer>
      </form>
    </FlexBox>
  );
}

export default Login;
