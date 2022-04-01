import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_LOGGED_IN } from '../utils/redux/actions/action';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SIGNUP, LOGIN } from '../utils/mutations';
import createAuth0Client from '@auth0/auth0-spa-js';
import { AiOutlineConsoleSql } from 'react-icons/ai';

export default function Landing() {
  const [login, { error }] = useMutation(LOGIN);

  const {
    user,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  console.log('user', user);
  console.log('isAuthenticated', isAuthenticated);

  const [token, setToken] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    let accessToken;
    let idToken;

    const getTokens = async () => {
      try {
        accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'read:current_user',
        });
      } catch (e) {
        console.log(e.message);
      }

      try {
        const claims = await getIdTokenClaims();
        idToken = claims.__raw;
        // console.log('idToken', idToken);
        setToken(idToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    const loginUser = async () => {
      try {
        const { data } = await login({
          variables: { email: user.email },
        });

        Auth.login(data.login.token);

        dispatch({
          type: UPDATE_LOGGED_IN,
          loggedIn: true,
        });
      } catch (error) {
        console.log(error);
        console.log('Could not log in');
      }
    };

    // getTokens();
    // if (token) loginUser();
    loginUser();
  }, [
    getAccessTokenSilently,
    getIdTokenClaims,
    user,
    dispatch,
    isAuthenticated,
    login,
    token,
  ]);

  return <></>;
}
