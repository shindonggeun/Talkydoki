import { Card } from "@/styles/common/ui/card";
import styled from "styled-components";

export const FlexBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  width: 70vw;
  font-size: 1.5rem;
  font-family: "ScoreDream";
  font-weight: 600;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px so;
`;

export const SignupBox = styled(Card)`
  width: 25vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 150px;
  height: 68%;
`;

export const SingupInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25vw;
  height: 70%;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25vw;
  height: 22%;
`;

export const EmailDiv = styled.div`
  width: 18vw;
  display: flex;
  justify-content: space-between;
  height: 4.8vh;
  align-items: center;
  margin-bottom: 5%;
`;

export const EmailInput = styled.input`
  width: 12vw;
  height: 4.5vh;
  border-radius: 0.625rem;
  border: 1.5px solid #d9d9d9;
`;

export const SocialButtonDiv = styled.div`
  width: 18vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5vh;
`;
