import styled from "styled-components";

// 음각 타이틀
export const NegativeTitle = styled.h1`
  color: transparent;
  font-size: 30pt;
  margin-left: 1.5vw;
  background: radial-gradient(ellipse, var(--shadow) 50%, var(--shadow-dark)),
    linear-gradient(to bottom, var(--shadow-dark) 10%, transparent),
    linear-gradient(to top, var(--shadow-dark) 10%, transparent);
  background-clip: text;
  font-weight: 900;

  /* 드래그 방지 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
