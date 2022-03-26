import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_MESSAGES } from "../../utils/queries";

import { Scrollbars } from "react-custom-scrollbars-2";
import "./messages.style.css";

import Message from "../../components/Message";
import Form from "../../components/Form/index";
import MessageContent from "../../components/Message-Content";

export default function Messages() {
  const myRef = useRef();
  const [top, setTop] = useState(0);

  const [messages, setMessages] = useState([]);
  const { loading, data } = useQuery(QUERY_ALL_MESSAGES);

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
