import React from "react";

import send from "../assets/images/send.svg";
import linkedin from "../assets/images/linkedin.svg";
import github from "../assets/images/github.svg";

export default function Footer() {
  return (
    <footer id="container-contact" style={{ background: "#edcd1f" }}>
      <a
        id="email"
        href="mailto:hugh80082@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <img src={send} alt="send" />
      </a>
      <a
        // className='mr-3 text-white'
        href="https://www.linkedin.com/in/huiran-lin-0999b419b/"
        style={{ textDecoration: "none" }}
      >
        <img src={linkedin} alt="linkedin" />
      </a>
      <a
        // className='text-white'
        href="https://github.com/hugh18019"
        style={{ textDecoration: "none" }}
      >
        <img src={github} alt="linkedin" />
      </a>
    </footer>
  );
}
