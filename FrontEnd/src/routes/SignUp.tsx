import { useSignup } from "@/api/memberApi";
import { SignupParams } from "@/interface/AuthInterface";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  FlexBox,
  Title,
  AuthContainer,
  AuthMain,
  AuthMainFooter,
} from "@/styles/User/AuthForm";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isSamePassword, isValidAuth } from "@/util/common/validator";
import { useSignupErrors } from "@/stores/signUpStore";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { emailError, nameError, nicknameError, passwordError } =
    useSignupErrors();

  const [formData, setFormData] = useState<SignupParams>({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const { mutate: signup } = useSignup();

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
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={emailError ? true : false}
              helperText={emailError ? emailError : null}
            />
            <TextField
              label="이름"
              variant="outlined"
              color="purple"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={nameError ? true : false}
              helperText={nameError ? nameError : null}
            />
            <TextField
              label="닉네임"
              variant="outlined"
              color="purple"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
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

            <FormControl fullWidth variant="outlined" color="purple">
              <InputLabel htmlFor="password">비밀번호</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
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
                error={passwordError ? true : false}
              />
              <FormHelperText error={passwordError ? true : false}>
                8~16자, 영문, 숫자, 특수문자 포함
              </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" color="purple" fullWidth>
              <InputLabel htmlFor="passwordConfirm">비밀번호확인</InputLabel>
              <OutlinedInput
                error={!isSamePassword(formData.password, passwordConfirm)}
                id="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPasswordConfirm((prev) => !prev)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
              {!isSamePassword(formData.password, passwordConfirm) && (
                <FormHelperText error>
                  정확한 비밀번호를 입력해주세요
                </FormHelperText>
              )}
            </FormControl>
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
            disabled={!isValidAuth(formData, passwordConfirm)}
          >
            회원가입
          </Button>
        </form>
      </AuthContainer>
    </FlexBox>
  );
};

export default SignUp;
