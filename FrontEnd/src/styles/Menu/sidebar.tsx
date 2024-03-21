import { Divider } from "@mui/material";
import styled from "styled-components";

// 프로필 섹션
export const ProfileSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  .profileDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0 15px 0;
    width: 100%;

    .profileImg {
      width: 70%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 50%;
    }

    .name {
      font-weight: 500;
      padding: 15px 0;
    }
  }
`;

export const SidebarTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .icon {
    cursor: pointer;
    margin: 0 5px;

    &:hover {
      color: var(--yellow-dark);
    }
  }

  img.logoImg {
    width: 50%;
  }
`;

// 디바이더
export const MenuDivider = styled(Divider)`
  * {
    color: var(--main);
    margin-bottom: 10px;
  }
`;

// 메뉴 바로가기
export const MenuItem = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  &,
  &:before {
    width: 100%;
    height: 45px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    cursor: pointer;
    transition: 0.3s all ease;
  }

  &:hover {
    background-color: var(--shadow);
  }

  /* 메뉴 이름 */
  .label {
    display: flex;

    & > * {
      margin: 0 5px;
    }
  }

  /* 현재 메뉴 */

  &.selected {
    position: relative;
    background: linear-gradient(
      to right,
      rgb(from var(--main) r g b / 0.8),
      var(--main-dark)
    );

    &:before {
      content: " ";
      background: linear-gradient(
        to right,
        transparent,
        rgb(255, 255, 255, 0.3)
      );
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }

    &:hover {
      &::before {
        opacity: 1;
      }
    }

    * {
      color: var(--text-button);
    }
  }
`;

export const SidebarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 99;
`;
