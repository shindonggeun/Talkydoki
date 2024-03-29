import styled from "styled-components";
import Texture from "@/assets/images/texture.png";

export const IntroWrapper = styled.div`
  width: 100vw;
  display: flex;
`;

export const IntroSidebarWrapper = styled.div`
  width: 100vw;
  height: 80px;
  padding: 0 30px;
  position: fixed;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  .textLogo {
    width: 150px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      cursor: pointer;

      &:hover {
        color: var(--yellow-dark);
      }
    }

    & > * {
      width: max-content;
      margin: 1vh 5px;
    }
  }
`;

export const IntroContentsWrapper = styled.div`
  width: 100vw;
  z-index: 1;
`;

export const IntroBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
`;

const SectionBase = styled.section`
  width: 100vw;
`;

export const BackgroundSectionWrapper = styled(SectionBase)`
  position: fixed;
  z-index: 0;
`;

export const IntroSectionWrapper = styled(SectionBase)`
  height: 250vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;

  .contentBox {
    width: 100%;
    height: 100%;
    padding: 0 150px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .section {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:nth-child(2) {
        div {
          opacity: 0;
          transform: translateY(-30px);
          transition: transform 1s ease, opacity 0.5s ease;
        }

        &.active {
          div {
            opacity: 1;
            transform: translateY(0px);

            ${() => {
              const children = [];
              for (let n = 1; n < 6; n++) {
                children.push(`&:nth-child(${n}) {
                  transition-delay: ${(n - 1) * 0.3}s;
            }`);
              }
              return children;
            }}
          }
        }
      }
    }

    .quote {
      font-size: 24pt;
      font-weight: 900;
      margin: 1vh 0;

      .strong {
        color: var(--main-dark);
      }
    }

    .intros {
      padding-top: 50px;
      width: 500px;
      text-align: justify;
      word-break: keep-all;
    }
  }

  @media screen and (max-width: 992px) {
    .contentBox {
      width: 100%;
      min-width: 0;
      padding: 0;

      .quote {
        font-size: 16pt;
      }

      .intros {
        width: 300px;
      }
    }
  }
`;

export const PageSectionWrapper = styled(SectionBase)`
  /* margin-bottom: 50vh; */

  .page {
    width: 100%;
    height: 150vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: repeat;
    margin-bottom: 50vh;
    position: relative;
    box-shadow: 0 0 50px 0px rgb(0, 0, 0, 0.3);

    .background {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;

      &:after {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: url(${Texture});
        filter: brightness(0.8);
        opacity: 0.3;
      }
    }

    .image {
      width: 60%;
      min-height: 500px;
      object-fit: contain;
      opacity: 0;
      transition: opacity 2s ease;
      z-index: 1;
    }

    .desc {
      width: 30%;
      padding: 20vh 3vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: end;
      z-index: 1;

      * {
        color: var(--text-button);
        opacity: 0;
        transform: translateX(50px);
        transition: transform 1s ease, opacity 0.5s ease;
        text-align: end;

        ${() => {
          const children = [];
          for (let n = 2; n < 7; n++) {
            children.push(`&:nth-child(${n}) {
              transition-delay: ${(n - 1) * 0.1}s;
            }`);
          }
          return children;
        }}
      }
    }

    &.active {
      * {
        opacity: 1;
        transform: translateX(0px);
      }
    }

    &.reverse {
      flex-direction: row-reverse;

      .desc {
        align-items: start;
        * {
          text-align: start;
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      width: 40vw;
    }
  }

  @media screen and (max-width: 992px) {
    .page,
    .page.reverse {
      flex-direction: column;

      .image {
        width: 90%;
        min-height: 0;
        margin: 25px 0;
      }

      .desc {
        padding: 3vh 3vw;
        width: 80%;
        height: fit-content;
      }
    }
  }
`;
