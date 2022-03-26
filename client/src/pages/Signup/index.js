import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_LOGGED_IN } from "../../utils/redux/actions/action";

import { Link } from "react-router-dom";

import "./signup.styles.scss";
import { useMutation, useQuery } from "@apollo/client";

import { SIGNUP, ADD_USER_TESTER, LOGIN } from "../../utils/mutations";
import auth from "../../utils/auth";

function SignUp() {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({ email: "", password: "" });

  const [signup, { error }] = useMutation(SIGNUP);

  var handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  var handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signupRes = await signup({
        variables: { email: formState.email, password: formState.password },
      });

      console.log(signupRes);

      // Get the token from the response data
      const token = signupRes.data.signup.token;

      dispatch({
        type: UPDATE_LOGGED_IN,
        loggedIn: true,
      });

      auth.login(token);
    } catch (error) {
      console.log("Could not sign up");
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("formState", formState);
  }, [formState]);

  return (
    <div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            email
            <input
              className="form-input"
              type="text"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </label>
          <label>
            password
            <input
              className="form-input"
              type="text"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="custom-button">
            signup
          </button>
        </form>
      </div>

      <Link to="/login" className="login-text">
        Have an account? Login
      </Link>
    </div>
  );
}

export default SignUp;
