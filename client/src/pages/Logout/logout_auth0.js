import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import Auth from "../../utils/auth";

import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

import { UPDATE_LOGGED_IN } from "../../utils/redux/actions/action";

import "./logout.styles.css";

export default function Logout_auth0() {
  const [cookies, removeCookie] = useCookies(["id_token"]);

  const { logout } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: UPDATE_LOGGED_IN,
      logged_in: false,
    });

    removeCookie("id_token", { path: "/" });

    logout();
  }, []);

  return <div id="logout-page">Loging out</div>;
}
