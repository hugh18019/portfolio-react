import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_MESSAGES, QUERY_CURRENT_USER } from "../../utils/queries";

import { Scrollbars } from "react-custom-scrollbars-2";
import "./messages.style.css";

import Message from "../../components/Message";
import Form from "../../components/Form/index";
import MessageContent from "../../components/Message-Content";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [curUser, setCurUser] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_MESSAGES);
  const { loading: cur_user_loading, data: cur_user_data } =
    useQuery(QUERY_CURRENT_USER);

  useEffect(() => {
    if (cur_user_data) {
      setCurUser(cur_user_data);
      console.log("cur_user_data", cur_user_data);
    }
  }, [cur_user_data]);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setMessages(data.messages);
    }
  }, [data]);

  return (
    <div id="messages-page">
      <div className="messages-container">
        <Scrollbars style={{ width: "15%", height: "60%" }}>
          <div className="scrollbar-items-container">
            {messages.map((message, index) => {
              return <Message key={index} props={message} />;
            })}
          </div>
        </Scrollbars>
        <MessageContent />
      </div>
      <Form />
    </div>
  );
}
