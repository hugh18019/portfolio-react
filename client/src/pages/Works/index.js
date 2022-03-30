import * as React from "react";
import { Button } from "@material-ui/core";
import "./works.style.css";

import terminal_green from "../../assets/images/terminal_green.svg";
import github_cyan from "../../assets/images/github-cyan.svg";
import codesandbox from "../../assets/images/codesandbox.svg";

import PokemonBattler from "../../assets/images/Pokemon-Battler.png";
import DrinkLibrary from "../../assets/images/Drink-Library.png";
import WeatherDashboard from "../../assets/images/Weather-Dashboard.jpg";
import Tidy from "../../assets/images/tidy-resized.png";

const Works = [
  {
    name: "Pokemon Battler",
    img: PokemonBattler,
    deployed: "https://pokebattlerproject.herokuapp.com",
    description:
      "A web game that mimics the battle mechanics of the classic Pokemon games on Nintendo.",
    // techs: ["Node.js", "Express.js", "MYSQL2", "Sequelize"],
  },
  {
    name: "Drink Library",
    img: DrinkLibrary,
    deployed: "https://hugh18019.github.io/Drinks-Library/",
    description:
      "A web app that recommends drink recipes based on an event you want to celebrate.",
    // techs: ["HTML", "CSS", "API", "Javascript", "Moment.js"],
  },
  {
    name: "Weather Dashboard",
    img: WeatherDashboard,
    deployed: "https://hugh18019.github.io/Weather-Dashboard/",
    description: "A weather forecast app.",
    // techs: ["HTML", "CSS", "Bootstrap", "jQuery", "API"],
  },
  {
    name: "Tidy",
    img: Tidy,
    deployed: "https://tidy-clean.herokuapp.com",
    description:
      "A workspace app for employers to bring a bit of flavor into their work life.",
    // techs: [
    //   "React.js",
    //   "Material UI",
    //   "GraphQL",
    //   "MongoDB",
    //   "Mongoose",
    //   "JWT",
    //   "Express.js",
    //   "Draggable",
    // ],
  },
];

export default function Projects() {
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
    <div id="container-works-page">
      <h2 id="section-title-works-page">
        <div style={{ marginRight: "5px" }}>Projects I&apos;ve Worked On</div>
        <img src={terminal_green} alt="terminal_green" />
      </h2>

      <div className="projects-container">
        {Works.map((Work, index) => (
          <div key={index} className="single-project-container">
            <a
              className="project"
              href={Work.deployed}
              onMouseEnter={changeHlColorOnMouseEnter}
              onMouseLeave={changeHlColorOnMouseUp}
            >
              <img
                src={Work.img}
                className="project-img rounded img-fluid"
                alt="otherwork cap"
              />
            </a>

            <div className="project-info" index={index}>
              <div
                className="hl"
                index={index}
                style={{ borderTopColor: `${hl}` }}
                onMouseEnter={changeHlColorOnMouseEnter}
                onMouseLeave={changeHlColorOnMouseUp}
              />

              <div className="project-title" index={index}>
                <div className="project-icons">
                  <a href={Work.deployed}>
                    <img src={github_cyan} index={index} alt="github-cyan" />
                  </a>
                  <img src={codesandbox} index={index} alt="codesandbox" />
                </div>
                <div style={{ paddingLeft: "5px" }}>{Work.name}</div>
              </div>
              <div className="project-description" index={index}>
                {Work.description}
              </div>
              {/* <div className="tech-used" index={index}>
                {Work.techs.map((tech, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    style={{
                      color: "orange",
                      backgroundColor: "white",
                      margin: "2%",
                      border: "none",
                      borderRadius: "5px",
                      height: "25px",
                    }}
                  >
                    {tech}
                  </Button>
                ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
