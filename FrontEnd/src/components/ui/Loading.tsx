import { PacmanLoader } from "react-spinners";

type Props = {};

function Loading({}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>잠시만 기다려주세요</h1>
      <PacmanLoader color="#0000FF" size={50} />
    </div>
  );
}

export default Loading;
