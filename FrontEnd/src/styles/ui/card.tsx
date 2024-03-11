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
