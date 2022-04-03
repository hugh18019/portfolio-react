import React from "react";

import "./work.style.css";

import github_cyan from "../../assets/images/github-cyan.svg";
import codesandbox from "../../assets/images/codesandbox.svg";

export default function Work({ work }) {
  console.log("work", work);

  const [hl, setHl] = React.useState("");

  let mounted = false;

  function changeHlColorOnMouseEnter() {
    setHl("#edcd1f");
  }

  function changeHlColorOnMouseUp() {
    setHl("white");
  }

  React.useEffect(() => {
    mounted = true;
  });

  return (
    <div
      className="single-project-container"
      onMouseEnter={changeHlColorOnMouseEnter}
      onMouseLeave={changeHlColorOnMouseUp}
    >
      <a className="project" href={work.deployed}>
        <img
          src={work.img}
          className="project-img rounded img-fluid"
          alt="otherwork cap"
        />
      </a>

      <div className="project-info">
        <div
          className="hl"
          style={{ borderTopColor: `${hl}` }}
          onMouseEnter={changeHlColorOnMouseEnter}
          onMouseLeave={changeHlColorOnMouseUp}
        />

        <div className="project-title">
          <div className="project-icons">
            <a href={work.deployed}>
              <img src={github_cyan} alt="github-cyan" />
            </a>
            <img src={codesandbox} alt="codesandbox" />
          </div>
          <div style={{ paddingLeft: "5px" }}>{work.name}</div>
        </div>
        <div className="project-description">{work.description}</div>
      </div>
    </div>
  );
}
