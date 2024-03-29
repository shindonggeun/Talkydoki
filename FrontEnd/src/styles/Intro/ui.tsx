import styled from "styled-components";

export const TextFlow = styled.div`
  .track {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      font-weight: 900;
      font-size: 400pt;
      white-space: nowrap;
      line-height: 1;
      opacity: 0.1;
      animation: moveToLeft 600s linear infinite;
      -webkit-animation: moveToLeft 600s linear infinite;
    }
  }

  @-webkit-keyframes moveToLeft {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

export const SectionTitle = styled.div`
  font-size: 65pt;
  font-weight: 900;
  margin-top: 10vh;
  position: absolute;
  top: -25  vh;
  left: 10px;

  @media screen and (max-width: 992px) {
    font-size: 43pt;
    top: -20vh;
  }
`;
