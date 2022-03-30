import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Timer() {
  const [time, setTime] = useState();
  let timer = 0;

  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment().format("h:mm:ss a"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <>{time}</>;
}
