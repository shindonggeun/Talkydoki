import { useSignup } from "@/api/memberApi";
import { SignupParams } from "@/interface/AuthInterface";
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
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignupParams>({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const { mutate: signup } = useSignup();

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
            <TextField
              label="비밀번호"
              variant="outlined"
              color="purple"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                width: "72%",
                marginBottom: "5%",
                backgroundColor: "var(--bg-modal)",
              }}
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="비밀번호 확인"
              variant="outlined"
              color="purple"
              sx={{ width: "72%", backgroundColor: "var(--bg-modal)" }}
              size="small"
            />
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
