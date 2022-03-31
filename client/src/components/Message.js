import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_CURRENT_MESSAGE,
  SHOW_FORM,
} from "../utils/redux/actions/action";

import Button from "@material-ui/core/Button";

const Message = ({ props }) => {
  const [message, setMessage] = useState({});

  console.log("message", message);

  useEffect(() => {
    if (props) {
      setMessage(props);
      console.log(message);
    }
  }, [props]);

  const dispatch = useDispatch();

  function handleClickMessage() {
    dispatch({
      type: UPDATE_CURRENT_MESSAGE,
      current_message: message,
    });

    dispatch({
      type: SHOW_FORM,
      show_form: false,
    });
  }

  return (
    <Button onClick={handleClickMessage}>
      {message && <>{message.content}</>}
    </Button>
  );
};

export default Message;
