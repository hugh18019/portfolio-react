import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Message-Content.style.css";

export default function MessageContent() {
  const state = useSelector((state) => state);

  const current_message = state.main.current_message;

  console.log("state in MessageContent", state);
  console.log("current_message", current_message);

  return (
    <>
      <div className="message-content">
        {current_message ? <>{current_message.content}</> : <></>}
      </div>
    </>
  );
}
