import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_LOGGED_IN } from "../utils/redux/actions/action";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { SIGNUP, LOGIN } from "../utils/mutations";
import Messages from "./Messages";
import Loading from "../components/Loading";

export default function Landing() {
  const loggedIn = useSelector((state) => state.main.loggedIn);

  const [login, { error }] = useMutation(LOGIN);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } =
    useAuth0();

  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    let accessToken;
    let idToken;

    const getTokens = async () => {
      try {
        accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: "read:current_user",
        });
      } catch (e) {
        console.log(e.message);
      }

      try {
        const claims = await getIdTokenClaims();
        idToken = claims.__raw;
        console.log("claims", claims);
        // console.log("idToken", idToken);
        setToken(idToken);
        setEmail(claims.email);
      } catch (e) {
        console.log(e.message);
      }
    };

    const loginUser = async () => {
      try {
        const { data } = await login({
          variables: { email: email },
        });

        Auth.login(data.login.token);

        dispatch({
          type: UPDATE_LOGGED_IN,
          loggedIn: true,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        console.log("Could not log in");
      }
    };

    if (isAuthenticated) {
      getTokens();

      if (email) {
        console.log("email", email);
        loginUser();
      }
    }
  }, [
    getAccessTokenSilently,
    getIdTokenClaims,
    user,
    dispatch,
    isAuthenticated,
    login,
    token,
    email,
    loading,
  ]);

  return (
    <div>
      {loggedIn && token && <Messages />}
      {!loggedIn && !token && <Loading />}
    </div>
  );
}
