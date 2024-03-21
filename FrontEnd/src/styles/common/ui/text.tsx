import styled from "styled-components";

// 음각 타이틀
export const NegativeTitle = styled.h1`
  color: transparent;
  font-size: 30pt;
  margin-left: 1.5vw;
  background: ${(props) =>
    props.theme.mode == "light"
      ? `radial-gradient(ellipse, var(--shadow) 50%, var(--shadow-dark)),
    linear-gradient(to bottom, var(--shadow-dark) 10%, transparent),
    linear-gradient(to top, var(--shadow-dark) 10%, transparent)`
      : `linear-gradient(to right, rgb(from var(--main-dark) r g b / 0.8), var(--blue-dark))`};
  background-clip: text;
  font-weight: 900;
`;
