import { useSignup } from "@/api/memberApi";
import PasswordInput from "@/components/ui/PasswordInput";

import {
  FlexBox,
  Title,
  AuthContainer,
  AuthMain,
  AuthMainFooter,
} from "@/styles/User/AuthForm";
import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isSamePassword, isValidAuth } from "@/util/common/validator";
import { useSignupErrors } from "@/stores/signUpStore";

const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const { emailError, nameError, nicknameError, passwordError } =
    useSignupErrors();

  const { mutate: signup } = useSignup();

  // 회원가입요청 보내는 코드
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ name, email, password, nickname });
  };

  return (
    <FlexBox>
      <AuthContainer>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          {/* 회원가입 폼 */}
          <AuthMain>
            <TextField
              label="이메일"
              variant="outlined"
              color="purple"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              error={emailError ? true : false}
              helperText={emailError ? emailError : null}
            />
            <TextField
              label="이름"
              variant="outlined"
              color="purple"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              error={nameError ? true : false}
              helperText={nameError ? nameError : null}
            />
            <TextField
              label="닉네임"
              variant="outlined"
              color="purple"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
              error={nicknameError ? true : false}
              helperText={nicknameError ? nicknameError : null}
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
            <PasswordInput
              password={password}
              setPassword={setPassword}
              isConfirm={false}
              error={passwordError}
            />
            <PasswordInput
              password={passwordConfirm}
              setPassword={setPasswordConfirm}
              isConfirm={true}
              isDefferent={!isSamePassword(password, passwordConfirm)}
            />
          </AuthMain>
          <AuthMainFooter>
            <Divider textAlign="center">or</Divider>
            <div>
              이미 가입하셨나요?{" "}
              <Link className="link" to="/login">
                로그인
              </Link>
            </div>
          </AuthMainFooter>
          <Button
            type="submit"
            variant="contained"
            color="purple"
            fullWidth
            disabled={
              !isValidAuth({ name, nickname, password, email }, passwordConfirm)
            }
          >
            회원가입
          </Button>
        </form>
      </AuthContainer>
    </FlexBox>
  );
};

export default SignUp;
