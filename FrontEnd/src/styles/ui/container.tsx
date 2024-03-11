import styled from "styled-components";

// 전체 Container
export const Container = styled.div`
  display: flex;

  /* width 992px부터 모바일 버전 */
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

// 사이드바
export const SidebarWrapper = styled.div`
  width: 18vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  @media screen and (max-width: 992px) {
    left: -18vw;
  }
`;

// Nav Bar (모바일 비율에서 활성화)
export const NavbarWrapper = styled.div`
  width: 100vw;
  height: 60px;
  display: none;
  position: fixed;
  top: 0;

  @media screen and (max-width: 992px) {
    display: block;
  }
`;

// 본문 Wrapper
export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 3vw;
  padding-left: 20vw;

  @media screen and (max-width: 992px) {
    padding-left: 2vw;
    padding-top: 60px;
  }
`;
