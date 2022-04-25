import * as React from "react";
import { Button } from "@material-ui/core";
import "./main_projects.style.css";

import PokemonBattler from "../../assets/images/Pokemon-Battler.png";
import DrinkLibrary from "../../assets/images/Drink-Library.png";
import WeatherDashboard from "../../assets/images/Weather-Dashboard.jpg";
import Tidy from "../../assets/images/tidy-resized.png";
import terminal_green from "../../assets/images/terminal_green.svg";

import Work from "../../components/Work";

const Works = [
  {
    name: "Pokemon Battler",
    img: PokemonBattler,
    deployed: "https://pokebattlerproject.herokuapp.com",
    description:
      "A web game that mimics the battle mechanics of the classic Pokemon games on Nintendo.",
  },
  {
    name: "Drink Library",
    img: DrinkLibrary,
    deployed: "https://hugh18019.github.io/Drinks-Library/",
    description:
      "A web app that recommends drink recipes based on an event you want to celebrate.",
  },
  {
    name: "Weather Dashboard",
    img: WeatherDashboard,
    deployed: "https://hugh18019.github.io/Weather-Dashboard/",
    description: "A weather forecast app.",
  },
  {
    name: "Tidy",
    img: Tidy,
    deployed: "https://tidy-clean.herokuapp.com",
    description:
      "A workspace app for employers to bring a bit of flavor into their work life.",
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
        {Works.map((work, index) => {
          return <Work key={index} work={work} />;
        })}
      </div>
    </div>
  );
}
