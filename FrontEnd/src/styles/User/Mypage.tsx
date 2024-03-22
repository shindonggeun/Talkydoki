import styled from "styled-components";
import { Wrapper } from "../common/ui/container";

export const MyPageWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

export const ProfileContainer = styled.div`
  width: 100;
  border: 1px solid;
  align-self: flex-end;
  .button {
    align-self: flex-end;
  }
`;
export const HeaderContainer = styled.div`
  width: 100%;
  border: 1px solid;
  display: flex;
`;

export const JandiContainer = styled.div`
  width: 100%;
  border: 1px solid;
`;

export const MainContainer = styled.div`
  width: 100%;
  border: 1px solid;
`;
export const FooterContainer = styled.div`
  width: 100%;
  border: 1px solid;
`;
