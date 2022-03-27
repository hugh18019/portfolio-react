import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";

import "./form.style.css";

function Form(props) {
  console.log("props", props);

  const [addMessage, { error }] = useMutation(ADD_MESSAGE);

  const [formState, setFormState] = useState({ content: "" });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await addMessage({
        variables: { content: formState.content },
      });

      console.log("res", res);
    } catch (error) {
      console.log("Could not send message");
      console.log(error);
    }

    setFormState({ content: "" });
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log("formState", formState);
  };

  return (
    <form id="form" onSubmit={handleFormSubmit}>
      <label htmlFor="message-content"></label>
      <textarea
        id="content"
        value={formState.messageContent}
        name="content"
        type="content"
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return { messages: state.messages };
};

const mapDispatchToProps = (dispatch) => ({
  ADD_MESSAGE: (args) => dispatch(args),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
