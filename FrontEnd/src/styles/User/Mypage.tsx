import styled from "styled-components";
import { Wrapper } from "../common/ui/container";
import { Card } from "../common/ui/card";

export const MyPageWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

export const ProfileSection = styled.div`
  width: 100;
  /* border: 1px solid; */
  align-self: flex-end;
  .button {
    align-self: flex-end;
  }
`;
export const HeaderSection = styled.div`
  width: 100%;
  /* border: 1px solid; */
  display: flex;
  .MyAmountContainer {
    width: 60%;
    margin: 8vh 8vw;
    /* border: 1px solid; */
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 992px) {
      width: calc(100% - 3vw);
    }
  }
  .BageContainer {
    width: 40%;
    /* border: 1px solid; */
    @media screen and (max-width: 992px) {
      width: calc(100%);
    }
  }
  .ReadNewDiv {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* border: 1px solid; */
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    .label {
      font-family: "ScoreDream";
      font-weight: 700;
      font-size: 23px;
    }
    .count {
      font-family: "Mplus";
      font-weight: 900;
      font-size: 32px;
      color: var(--main);
    }
  }
  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MyPageCard = styled(Card)`
  height: 13.9375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .imgdiv {
    height: 100%;
    /* border: 1px solid; */
    background-image: url("/assets/images/logo_face.png");
    background-size: cover;
    background-position: center;
  }
`;

export const JandiSection = styled.div`
  width: 100%;
  /* border: 1px solid; */
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 992px) {
    overflow-x: auto;
    height: 100%;
  }

  .jandicontainer {
    /* border: 1px solid; */
    width: 95%;
    @media screen and (max-width: 992px) {
      width: 1000px;
      height: 100%;
      overflow-x: auto;
    }
  }
`;

export const JandiCard = styled(Card)`
  width: 100%;
  padding: 2vh 2vw;
  @media screen and (max-width: 992px) {
    width: 900px;
    height: 80%;
  }
`;
export const MainSection = styled.div`
  width: 100%;
  /* border: 1px solid; */
  display: flex;

  .NewsReportContainer {
    width: 70%;
    border: 1px solid;
  }
  .VocaReportContainer {
    width: 30%;
    border: 1px solid;
    position: relative;
  }
`;

export const FooterSection = styled.div`
  width: 100%;
  border: 1px solid;
`;

export const VocaCard = styled(Card)`
  width: 90%;
  height: 306px;
  position: absolute;
  top: 13%;
`;
