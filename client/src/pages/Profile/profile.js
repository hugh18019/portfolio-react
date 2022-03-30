import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { UPDATE_LOGGED_IN } from "../../utils/redux/actions/action";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { SIGNUP } from "../../utils/mutations";
import auth from "../../utils/auth";

export default function Profile(context) {
  const { user } = useAuth0();

  const dispatch = useDispatch();
  const [signup, { error }] = useMutation(SIGNUP);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      login_user();
    }
  }, [user]);

  var login_user = async () => {
    dispatch({
      type: UPDATE_LOGGED_IN,
      loggedIn: true,
    });

    try {
      const { data } = await signup({
        variables: { email: user.email },
      });

      const token = data.signup.token;
      console.log("token", token);

      auth.login(token);
    } catch (error) {
      console.log("User already in the database");
      console.log(error);
    }
  };

  return <></>;
}
