import React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_LOGGED_IN } from "../../utils/redux/actions/action";
import { Button } from "@material-ui/core";
import Auth from "../../utils/auth";
import { useAuth0 } from "@auth0/auth0-react";
import "./login.styles.css";

export default function Login_auth0() {
  const { loginWithRedirect, user } = useAuth0();

  const dispatch = useDispatch();

  async function login() {
    try {
      dispatch({
        type: UPDATE_LOGGED_IN,
        loggedIn: true,
      });

      loginWithRedirect();
    } catch (error) {
      console.log("Could not log in");
      console.log(error);
    }
  }

  return (
    <div id="login-page">
      <Button id="login-btn" onClick={() => login()}>
        Log in to view and send messages
      </Button>
    </div>
  );
}
