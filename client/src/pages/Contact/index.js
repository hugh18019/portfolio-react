import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Messages from "../Messages";
import Login_auth0 from "../Login/login_auth0";

export default function Contact() {
  const loggedIn = useSelector((state) => state.main.loggedIn);

  console.log("loggedIn", loggedIn);

  // if (!loggedIn) window.location.replace("/Login");

  return (
    <>
      {loggedIn && <Messages />}
      {!loggedIn && <Login_auth0 />}
    </>
  );
}
