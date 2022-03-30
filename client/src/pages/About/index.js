import React from "react";
import "./about.style.css";

import activity_yellow from "../../assets/images/activity_yellow.svg";

export default function About() {
  console.log("got here");
  const intro = `My name is Huiran Lin. I'm a full-stack web developer based in NorCal.`;
  const education = `I graduated from the Full-Stack Coding Bootcamp from UC Berkeley in summer 2021.
                                I'm currently pursuing a Bachelor's Degree in Computer Science from Sonoma State University,
                                and on course to graduate by Winter 2022.`;
  const experience = `Experience: I have 3+ years working with C++, and 1+ year developing in Javascript.`;

  return (
    <div id="container-about-page">
      <div className="intro-container">
        <h2 id="section-title-about-page">
          Bio <img src={activity_yellow} alt="activity_yellow" />
        </h2>
        <div style={{ paddingBottom: "10px" }}>
          <div style={{ marginLeft: "15px" }}> {`${intro}`} </div>
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <h4>Education:</h4>
          <div style={{ marginLeft: "15px" }}> {`${education}`} </div>
        </div>
        <div>
          <h4>Experience:</h4>
          <div style={{ marginLeft: "15px" }}> {`${experience}`} </div>
        </div>
      </div>
    </div>
  );
}
