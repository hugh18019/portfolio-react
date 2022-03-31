import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Messages from "../Messages";
import Login_auth0 from "../Login/login_auth0";
import { useAuth0 } from "@auth0/auth0-react";

export default function Contact() {
  const loggedIn = useSelector((state) => state.main.loggedIn);

  console.log("loggedIn", loggedIn);

  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && <Messages user={user} />}
      {!isAuthenticated && <Login_auth0 />}
    </>
  );
}
