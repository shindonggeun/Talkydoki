import { Card } from "../common/ui/card";
import styled from "styled-components";

export const FlexBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled(Card)`
  width: 25vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const LoginHeader = styled.div`
  width: 100%;
  height: 30%;
  /* border: 1px solid; */
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-family: "ScoreDream";
  font-weight: 600;
  text-align: center;
  /* height: 10%; */
  /* border: 1px solid; */
`;

export const LoginMain = styled.div`
  width: 100%;
  height: 40%;
  /* border: 1px solid; */
`;

export const LoginInputDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* height: 4.8vh; */
  justify-content: center;
  align-items: center;
  /* border: 1px solid; */
  margin-bottom: 5%;
`;

export const LoginMainFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  /* border: 1px solid; */
`;
export const LoginFooter = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid; */
  align-items: center;
  /* justify-content: center; */
`;
export const SocialButtonDiv = styled.div`
  width: 18vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5vh;
`;
