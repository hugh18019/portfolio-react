import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function MessageContent() {
  const state = useSelector((state) => state);
  console.log("state", state);

  const current_message = state.main.current_message;

  return (
    <>
      <div className="message-content">
        {current_message ? <>{current_message.content}</> : <></>}
      </div>
    </>
  );
}
