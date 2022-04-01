import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_LOGGED_IN } from "../../utils/redux/actions/action";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { SIGNUP, LOGIN } from "../../utils/mutations";
import createAuth0Client from "@auth0/auth0-spa-js";

export default async function Profile() {
  const auth0 = await createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  });

  const claims = await auth0.getIdTokenClaims();
  const id_token = claims.__raw;

  const { isAuthenticated, logout } = useAuth0();
  // const loggedIn = useSelector((state) => state.main.loggedIn);
  const dispatch = useDispatch();
  // const [signup, { error: signup_error }] = useMutation(SIGNUP);
  // const [login, { error: login_error }] = useMutation(LOGIN);
  if (id_token) {
    login_user();
  }

  var login_user = async () => {
    console.log("logging the user in");
    if (isAuthenticated) {
      try {
        Auth.login(id_token);

        dispatch({
          type: UPDATE_LOGGED_IN,
          loggedIn: true,
        });
      } catch (error) {
        console.log(error);
        logout();
      }
    }
  };

  return <></>;
}
