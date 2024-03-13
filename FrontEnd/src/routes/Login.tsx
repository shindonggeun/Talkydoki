import { useLogin } from "@/api/memberApi";
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
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

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
              <TextField
                label="비밀번호"
                variant="outlined"
                color="purple"
                sx={{
                  width: "100%",
                  backgroundColor: "var(--bg-modal)",
                }}
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
