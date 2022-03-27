import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_MESSAGES } from "../../utils/redux/actions/action";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_MESSAGES, QUERY_CURRENT_USER } from "../../utils/queries";

import { Scrollbars } from "react-custom-scrollbars-2";
import { FiEdit, FiSend } from "react-icons/fi";
import "./messages.style.css";

import Message from "../../components/Message";
import Form from "../../components/Form/index";
import MessageContent from "../../components/Message-Content";

export default function Messages() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main);
  const [show, setShow] = useState(false);

  const [messages, setMessages] = useState([]);
  const [curUser, setCurUser] = useState({});

  // const { loading, data } = useQuery(QUERY_ALL_MESSAGES);

  const { loading: cur_user_loading, data: cur_user_data } =
    useQuery(QUERY_CURRENT_USER);

  useEffect(() => {
    if (cur_user_data) {
      setCurUser(cur_user_data);
      setMessages(cur_user_data.current_user.messages);

      dispatch({
        type: UPDATE_MESSAGES,
        messages: messages,
      });
    }
  }, [cur_user_data]);

  const toggleShow = async () => {
    if (show == true) setShow(false);
    else setShow(true);
  };

  return (
    <div id="messages-page">
      <div className="messages-container">
        <div className="side-menu">
          <div className="buttons">
            <button onClick={toggleShow}>
              <FiEdit />
            </button>
            <button type="submit">
              <FiSend />
            </button>
          </div>
          <Scrollbars>
            <div className="scrollbar-items-container">
              {messages.map((message, index) => {
                return <Message key={index} props={message} />;
              })}
            </div>
          </Scrollbars>
        </div>
        {!show && <MessageContent />}
        {show && <Form />}
      </div>
    </div>
  );
}
