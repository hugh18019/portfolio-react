import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./navigation.style.css";

import cpu from "../../assets/images/cpu2.svg";
import clock from "../../assets/images/clock.svg";

class Navigation extends Component {
  constructor() {
    super();

    this.state = { time: 0 };
    this.timer = 0;
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ time: moment().format("h:mm:ss a") }),
      100
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { children } = this.props;
    const { time } = this.state;

    return (
      <div className="layout">
        <header>
          <nav className="nav">
            <div className="name-tag">
              {" "}
              <img src={clock} alt="clock" /> {`${time}`}
            </div>
            <div className="nav-content-container">
              <div id="navbar-content">
                <ul>
                  <li className="nav-item">
                    <img src={cpu} alt="cpu" />
                    <Link to="/Login" className="link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <img src={cpu} alt="cpu" />
                    <Link to="/Logout" className="link">
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <img src={cpu} alt="cpu" />
                    <Link to="/Hobby" className="link">
                      Hobbies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <img src={cpu} alt="cpu" />
                    <Link to="/Work" className="link">
                      Works
                    </Link>
                  </li>
                  <li className="nav-item">
                    <img src={cpu} alt="cpu" />
                    <Link to="/Message" className="link">
                      Message
                    </Link>
                  </li>
                  <li className="nav-item">
                    <img src={cpu} alt="cpu" />
                    <Link to="/Contact" className="link">
                      Contact
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
}

export default Navigation;
