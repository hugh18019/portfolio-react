import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_LOGGED_IN } from "../../utils/redux/actions/action";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { SIGNUP, LOGIN } from "../../utils/mutations";
import auth from "../../utils/auth";

export default function Profile() {
  const { user } = useAuth0();
  const loggedIn = useSelector((state) => state.main.loggedIn);
  const dispatch = useDispatch();
  const [signup, { error: signup_error }] = useMutation(SIGNUP);
  const [login, { error: login_error }] = useMutation(LOGIN);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      login_user();
    }
  }, [user]);

  var login_user = async () => {
    console.log("logging the user in");

    if (!loggedIn) {
      try {
        const { data } = await login({
          variables: { email: user.email },
        });

        const token = data.login.token;
        Auth.login(token);

        dispatch({
          type: UPDATE_LOGGED_IN,
          loggedIn: true,
        });
      } catch (error) {
        console.log("Could not login");
        console.log(error);
      }
    }
  };

  return <></>;
}
