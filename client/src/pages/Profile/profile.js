import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { UPDATE_LOGGED_IN } from "../../utils/redux/actions/action";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { SIGNUP } from "../../utils/mutations";

export default function Profile() {
  const { user } = useAuth0();

  const dispatch = useDispatch();
  const [signup, { error }] = useMutation(SIGNUP);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      login_user();
    }
  }, [user]);

  var login_user = () => {
    dispatch({
      type: UPDATE_LOGGED_IN,
      loggedIn: true,
    });
  };

  return <></>;
}
