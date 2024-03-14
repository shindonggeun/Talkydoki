import styled from "styled-components";

// 카드 베이스 (상속받아 사용할 것)

export const Card = styled.div`
  position: relative;
  margin: 4vh 1.5vw;
  background-color: var(--bg-modal);
  border-radius: 5px;
  box-shadow: 0px 1px 5px 3px var(--shadow);
  padding: 30px;
`;

export const AiChatCard = styled(Card)`
  width: 30%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    position: relative;

    p.categoryName {
      position: absolute;
      left: 0;
      bottom: -40%;
      width: 100%;
      text-align: center;
    }
  }

  /* 모바일 버전 비율 (화면 반정도) */
  @media screen and (max-width: 992px) {
    width: calc(50% - 3vw);
    aspect-ratio: 1;
  }
`;
