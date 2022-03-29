import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function Logout_auth0() {
  const { logout } = useAuth0();

  return <button onClick={logout()}>Log Out</button>;
}
