import { useLogin, useSocialLogin } from "@/api/memberApi";
import GoogleIcon from "@/assets/icon/google.png";
import KakaoIcon from "@/assets/icon/kakao.png";
import NaverIcon from "@/assets/icon/naver.png";
import PasswordInput from "@/components/ui/PasswordInput";

import {
  AuthMain,
  AuthFooter,
  FlexBox,
  AuthContainer,
  SocialButtonDiv,
  Title,
  AuthMainFooter,
} from "@/styles/User/AuthForm";
import { Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const { mutate: startSocial } = useSocialLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const socialLogin = (platform: string) => {
    console.log(platform);
    startSocial(platform);
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
            <PasswordInput
              password={password}
              setPassword={setPassword}
              isConfirm={false}
              label="비밀번호"
            />

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
              <div className="social" onClick={() => socialLogin("google")}>
                <img className="icon" src={GoogleIcon} alt="구글로 로그인" />
              </div>
              <div className="social" onClick={() => socialLogin("kakao")}>
                <img className="icon" src={KakaoIcon} alt="카카오로 로그인" />
              </div>
              <div className="social" onClick={() => socialLogin("naver")}>
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
