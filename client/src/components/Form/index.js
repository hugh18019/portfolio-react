import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_MESSAGE } from "../../utils/redux/actions/action";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";

import { FiEdit, FiSend } from "react-icons/fi";
import "./form.style.css";

export default function Form() {
  const dispatch = useDispatch();

  const [addMessage, { error }] = useMutation(ADD_MESSAGE);

  const [formState, setFormState] = useState({ messageContent: "" });

  // const [show, setShow] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMessage({
        variables: { content: formState.messageContent },
      });

      const message = data.addMessage;

      dispatch({
        type: UPDATE_MESSAGE,
        message: message,
      });

      setFormState({ messageContent: "" });
      window.location.replace("/Message");
    } catch (error) {
      console.log("Could not send message");
      console.log(error);
    }

    setFormState({ messageContent: "" });
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log("formState", formState);
  };

  // const toggleShow = async () => {
  //   if (show == true) setShow(false);
  //   else setShow(true);
  // };

  return (
    // {/* <button onClick={toggleShow}>
    //   <FiEdit />
    // </button> */}
    <form id="form" onSubmit={handleFormSubmit}>
      {/* {show && (
        <> */}
      <label htmlFor="message-content"></label>
      <textarea
        id="messageContent"
        value={formState.messageContent}
        name="messageContent"
        type="messageContent"
        onChange={handleChange}
      />
      {/* </>
      )} */}
      {/* <button type="submit">
          <FiSend />
        </button> */}
    </form>
  );
}
