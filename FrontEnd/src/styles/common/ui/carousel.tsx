import styled from "styled-components";

// 캐러셀 트랙
export const CarouselWrapper = styled.div<{
  $width: number;
  $height: number;
  $newsCount: number;
}>`
  width: ${(props) => `calc(${props.$width}% - 3vw)`};
  height: ${(props) => `${props.$height}vh`};
  border-radius: 5px;
  position: relative;
  overflow-x: hidden;
  margin: 4vh 1.5vw;

  @media screen and (max-width: 992px) {
    width: calc(100% - 3vw);
  }

  .track {
    display: flex;
    position: absolute;
    height: 100%;
    overflow: hidden;
    width: ${(props) => `calc(${props.$newsCount}*100%)`};
    transition: left 0.3s ease;
  }
`;

// 뉴스 아이템
export const CarouselItem = styled.div<{
  $width: number;
  $height: number;
  $bgImg: string;
}>`
  width: ${(props) => `${props.$width}%`};
  height: ${(props) => `${props.$height}vh`};
  background-image: ${(props) => `url(${props.$bgImg})`};
  background-size: cover;
  background-position: center;
  position: relative;
`;
