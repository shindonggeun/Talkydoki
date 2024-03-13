import styled from "styled-components";

export const IconBox = styled.div`
  width: calc(100% - 3vw);
  margin: 0 1.5vw;
  display: inline-flex;
  flex-grow: 1;
  height: fit-content;

  .titleBox {
    position: relative;
    width: 20%;
    min-width: 150px;
    padding: 10px;
    height: 100%;
    height: auto;

    .title {
      line-height: 0.9;
      margin-left: 0;
    }

    .icon {
      position: absolute;
      bottom: 10px;

      * {
        font-size: 130px;
      }
    }
  }

  @media screen and (max-width: 992px) {
    flex-wrap: wrap-reverse;
    justify-content: space-evenly;
    align-items: center;

    .titleBox {
      height: auto;
      width: calc(50% - 3vw);
      aspect-ratio: 1;
      flex-wrap: wrap;
      margin-top: 4vh;

      .title {
        font-size: 24pt;
      }

      .icon {
        bottom: 10px;
        right: 10px;

        * {
          font-size: ${window.innerWidth * 0.4}px;
        }
      }
    }

    * {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`;
