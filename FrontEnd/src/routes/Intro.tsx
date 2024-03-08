import { useSignup } from "@/api/memberApi";
import React from "react";
import { useTheme } from "styled-components";

function Intro() {
  const theme = useTheme();
  const { mutate: signup } = useSignup();

  return (
    <div>
      <button
        onClick={() => {
          signup({
            email: "A",
            password: "asdf123!",
            name: "name",
            nickname: "",
          });
        }}
      >
        d
      </button>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.main.color,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.main.dark,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.main.light,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.grey.color,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.grey.light,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.grey.dark,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.green.color,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.green.light,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.green.dark,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.red.color,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.red.light,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.red.dark,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.yellow.color,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.yellow.light,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.yellow.dark,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.blue.color,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.blue.light,
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.blue.dark,
          }}
        ></div>
      </div>
      <h1 style={{ color: theme.doc.text }}>컬러</h1>
      <div
        style={{
          margin: "30px",

          width: "300px",
          height: "300px",
          backgroundColor: theme.doc.backgroundModal,
          borderRadius: "5px",
          boxShadow: `0px 1px 5px 3px ${theme.doc.shadow}`,
          padding: "20px",
        }}
      >
        모달 속의 글자
      </div>
      <h1 className="title">오늘의 뉴스</h1>
    </div>
  );
}

export default Intro;
