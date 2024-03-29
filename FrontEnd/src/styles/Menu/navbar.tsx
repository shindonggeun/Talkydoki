import styled from "styled-components";

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;

  img.logo {
    height: 80%;
  }

  .menuToggle {
    position: absolute;
    left: 5vw;
    font-size: 2rem;
    color: var(--text);
  }
`;
