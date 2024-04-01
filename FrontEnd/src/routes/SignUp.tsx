import { useEmailSend, useEmailVerify, useSignup } from "@/api/memberApi";
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
import {
  useEmailVerifyActions,
  useEmailVerifyMessage,
  useEmailVerifyStatus,
} from "@/stores/userStore";

const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");

  const { mutate: emailsend } = useEmailSend();
  const { mutate: emailcheck } = useEmailVerify();
  const [sendCheck, setSendCheck] = useState(false);

  const { setEmailVerifyStatus } = useEmailVerifyActions();
  const emailVerifyStatus = useEmailVerifyStatus();
  const emailVerifyMessage = useEmailVerifyMessage();

  const { emailError, nameError, nicknameError, passwordError } =
    useSignupErrors();

  const { mutate: signup } = useSignup();

  // 회원가입요청 보내는 코드
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ name, email, password, nickname });
  };

  const handleEmailSend = (email: string) => {
    emailsend(email);
    setSendCheck(true);
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
                className="textField"
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailVerifyStatus("none");
                }}
                error={emailError ? true : false}
                helperText={
                  emailError
                    ? emailError
                    : sendCheck
                    ? "인증번호 전송완료"
                    : null
                }
              />
              <Button
                variant="contained"
                color="purple"
                className="button"
                onClick={() => handleEmailSend(email)}
              >
                인증코드 전송
              </Button>
            </div>
            <div className="emaildiv">
              <TextField
                label="인증코드"
                variant="outlined"
                color="purple"
                name="code"
                fullWidth
                className="textField"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                helperText={
                  emailVerifyStatus !== "none" ? emailVerifyMessage : ""
                }
              />

              <Button
                variant="contained"
                color="purple"
                className="button"
                onClick={() => handleEmailCheck()}
              >
                확인
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
              label="비밀번호"
            />
            <PasswordInput
              password={passwordConfirm}
              setPassword={setPasswordConfirm}
              isConfirm={true}
              isDefferent={!isSamePassword(password, passwordConfirm)}
              label="비밀번호 확인"
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
              !isValidAuth(
                { name, nickname, password, email },
                passwordConfirm,
                emailVerifyStatus
              )
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
