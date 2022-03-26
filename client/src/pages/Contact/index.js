import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Messages from "../Messages";

export default function Contact() {
  const loggedIn = useSelector((state) => state.main.loggedIn);

  console.log("loggedIn", loggedIn);

  if (!loggedIn) window.location.replace("/Login");

  return (
    <>
      <Messages />
    </>
  );
}
