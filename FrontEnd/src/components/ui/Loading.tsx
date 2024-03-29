import { PacmanLoader } from "react-spinners";

type Props = {};

function Loading({}: Props) {
  return (
    <div
      style={{
        position: "fixed", // 현재 보이는 화면에 고정
        top: 0, // 상단에서 0
        left: 0, // 좌측에서 0
        width: "100vw", // 전체 뷰포트 너비
        height: "100vh", // 전체 뷰포트 높이
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)", // 반투명 배경
        zIndex: 1000, // 다른 요소들 위에 보이도록 z-index 설정
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>잠시만 기다려주세요</h1>
      <PacmanLoader color="#0000FF" size={50} />
    </div>
  );
}

export default Loading;
