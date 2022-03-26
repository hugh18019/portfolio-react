import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CURRENT_MESSAGE } from "../utils/redux/actions/action";

import Button from "@material-ui/core/Button";

const Message = ({ props }) => {
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (props) {
      setMessage(props);
      console.log(message);
    }
  }, [props]);

  const dispatch = useDispatch();

  function handleDisplayMessage() {
    dispatch({
      type: UPDATE_CURRENT_MESSAGE,
      current_message: message,
    });
  }

  return (
    <Button onClick={handleDisplayMessage}>
      {message && <>{message.content}</>}
    </Button>
  );
};

export default Message;
