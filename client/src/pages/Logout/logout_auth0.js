import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_LOGGED_IN,
  CLEAR_STATE,
} from "../../utils/redux/actions/action";
import "./logout.styles.css";
import React, { useEffect } from "react";
import Auth from "../../utils/auth";

export default function Logout_auth0() {
  const { logout } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: UPDATE_LOGGED_IN,
      logged_in: false,
    });
    Auth.logout();
    logout();
  }, []);

  return <div id="logout-page">Loging out</div>;
}
