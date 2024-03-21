import styled from "styled-components";

// 마우스를 움직이면 이미지가 넘어가는 컨테이너
export const ThumbnailViewWrapper = styled.div<{
  $length: number;
  $isMobile: boolean;
}>`
  width: 100%;
  min-height: 35vh;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  .navigator {
    position: absolute;
    width: 100%;
    bottom: 20px;
    display: flex;
    justify-content: center;
    z-index: 1;
    display: ${(props) => props.$isMobile && `none`};

    .dot {
      margin: 0 2px;
      width: 7pt;
      height: 7pt;
      background-color: var(--bg-modal);
      opacity: 0.5;
      border-radius: 50%;
      border: 1px solid var(--grey);

      &.selected {
        opacity: 1;
      }
    }
  }

  .track {
    display: flex;
    width: ${(props) => `${props.$length * 100}%`};
    height: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      filter: brightness(0.8);
    }
  }

  &:hover {
    & img {
      filter: brightness(1);
    }
  }
`;
