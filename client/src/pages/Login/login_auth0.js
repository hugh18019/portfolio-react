import React from "react";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import "./login.styles.css";

export default function Login_auth0() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="login-page">
      <Button id="login-btn" onClick={() => loginWithRedirect()}>
        Log in to view and send messages
      </Button>
    </div>
  );
}
