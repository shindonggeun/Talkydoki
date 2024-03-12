import {
  ButtonBox,
  EmailDiv,
  EmailInput,
  FlexBox,
  Input,
  LoginBox,
  SingupInputBox,
  SocialButtonDiv,
  Title,
} from "@/styles/common/user/Login";
import { Button } from "@mui/material";

type Props = {};

function SignUpPage({}: Props) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: signup, isLoading } = useSignup();

  const handleSignupClick = () => {
    signup({ email, nickname, password });
  };
  return (
    <FlexBox>
      <LoginBox>
        <Title>회원가입</Title>
        <SingupInputBox>
          <Input
            placeholder="아이디를 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <EmailDiv>
            <EmailInput
              placeholder="김싸피@ssafy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></EmailInput>
            <Button variant="contained" color="purple" size="small">
              버튼
            </Button>
          </EmailDiv>
          <EmailDiv>
            <EmailInput placeholder="인증번호를 입력해주세요"></EmailInput>
            <Button variant="contained" color="purple" size="small">
              버튼
            </Button>
          </EmailDiv>
          <Input placeholder="8자 이상 비밀번호를 입력해주세요"></Input>
          <Input placeholder="비밀번호를 다시 입력해주세요"></Input>
        </SingupInputBox>
        <ButtonBox>
          <Button
            variant="contained"
            color="purple"
            size="small"
            sx={{ width: 280 }}
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
          <p>로그인</p>
        </ButtonBox>
      </LoginBox>
    </FlexBox>
  );
}

export default SignUpPage;
