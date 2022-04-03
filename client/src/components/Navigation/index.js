import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navigation.style.css";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineCoffee } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import clock from "../../assets/images/clock.svg";

import Timer from "../Timer";

function Navigation() {
  const logged_in = useSelector((state) => state.main.loggedIn);

  console.log("logged_in in Navigation", logged_in);

  return (
    <div className="layout">
      <header>
        <nav className="nav">
          <div className="name-tag">
            {" "}
            <img src={clock} alt="clock" /> <Timer />
          </div>
          <div className="nav-content-container">
            <div id="navbar-content">
              <ul>
                {!logged_in && (
                  <li className="nav-item">
                    <Link to="/Login" className="link">
                      <AiOutlineLogin /> Signin
                    </Link>
                  </li>
                )}
                {logged_in && (
                  <li className="nav-item">
                    <Link to="/Logout" className="link">
                      <AiOutlineLogout /> Signout
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/" className="link">
                    <AiOutlineHome /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Work" className="link">
                    <AiOutlineCoffee /> Works
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Contact" className="link">
                    <AiOutlineMessage /> Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navigation;
