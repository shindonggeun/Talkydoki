import { useEmailSend, useSignup, userEmailVerify } from "@/api/memberApi";
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
import { useEmailVerifyStore } from "@/stores/userStore";

const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate: emailsend } = useEmailSend();
  const { mutate: emailcheck } = userEmailVerify();
  const emailVerifyStatus = useEmailVerifyStore(
    (state) => state.emailVerifyStatus
  );
  const emailVerifyMessage = useEmailVerifyStore(
    (state) => state.emailVerifyMessage
  );

  const { emailError, nameError, nicknameError, passwordError } =
    useSignupErrors();

  const { mutate: signup } = useSignup();

  // 회원가입요청 보내는 코드
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ name, email, password, nickname });
  };

  const handleEmailCheck = () => {
    emailcheck({ email, code });
  };
  return (
    <FlexBox>
      <AuthContainer>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          {/* 회원가입 폼 */}
          <AuthMain>
            <div className="emaildiv">
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

              <Button
                variant="contained"
                color="purple"
                style={{ width: "10%", height: "55px", margin: "8px 15px" }}
                onClick={() => emailsend(email)}
              >
                전송
              </Button>
            </div>
            <div className="emaildiv">
              <TextField
                label="인증코드"
                variant="outlined"
                color="purple"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                helperText={
                  emailVerifyStatus !== "none" ? emailVerifyMessage : ""
                }
              />

              <Button
                variant="contained"
                color="purple"
                style={{ width: "10%", height: "55px", margin: "8px  15px" }}
                onClick={() => handleEmailCheck()}
              >
                전송
              </Button>
            </div>
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
