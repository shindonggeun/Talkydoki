import styled from "styled-components";

interface ButtonProps {
  width?: string;
  height?: string;
}

export const BlueButton = styled.button<ButtonProps>`
  background-color: var(--blue);
  width: ${({ width }) => width || "120px"}; /* 기본값은 120px */
  height: ${({ height }) => height || "40px"}; /* 기본값은 40px */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 3px var(--shadow);
  font-family: "ScoreDream";
  font-weight: 500;
`;
