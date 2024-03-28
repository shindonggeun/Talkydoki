import { Card } from "../common/ui/card";
import styled from "styled-components";

export const FlexBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthContainer = styled(Card)`
  width: 50vw;

  @media screen and (max-width: 992px) {
    width: 80vw;
  }
`;

export const Title = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 3vh;
  text-align: center;
`;

export const AuthMain = styled.div`
  width: 100%;
  padding: 0 30px;
  max-height: 45vh;
  overflow-y: auto;

  .emaildiv {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
  }
  * {
    margin: 1vh 0;
  }

  .button {
    margin-top: 1vh;
    width: fit-content;
    margin-left: 1vw;
    height: 56px;
  }

  @media screen and (max-width: 992px) {
    padding: 20px 0;
  }
`;

export const AuthMainFooter = styled.div`
  text-align: center;
  margin: 2vh 0 4vh 0;

  & > div {
    margin: 2vh 0;
  }

  .link {
    color: var(--blue);
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
export const AuthFooter = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SocialButtonDiv = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4vh 0;

  .social {
    width: 60px;
    aspect-ratio: 1;
    margin: 0 5px;
    cursor: pointer;

    .icon {
      width: 100%;
      object-fit: contain;
    }
  }
`;
