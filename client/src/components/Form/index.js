import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_MESSAGE } from "../../utils/redux/actions/action";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";

import "./form.style.css";
import { FiSend } from "react-icons/fi";

export default function Form() {
  const dispatch = useDispatch();

  const [addMessage, { error }] = useMutation(ADD_MESSAGE);

  const [formState, setFormState] = useState({ messageContent: "" });

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
  };

  return (
    <form id="form" onSubmit={handleFormSubmit}>
      <label htmlFor="message-content"></label>
      <textarea
        id="messageContent"
        value={formState.messageContent}
        name="messageContent"
        type="messageContent"
        onChange={handleChange}
      />
      <button type="submit">
        <FiSend />
      </button>
    </form>
  );
}
