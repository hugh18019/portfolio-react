import * as React from "react";
import { Button } from "@material-ui/core";
import "./works.style.css";

import PokemonBattler from "../../assets/images/Pokemon-Battler.png";
import DrinkLibrary from "../../assets/images/Drink-Library.png";
import WeatherDashboard from "../../assets/images/Weather-Dashboard.jpg";
import Tidy from "../../assets/images/tidy-resized.png";
import terminal_green from "../../assets/images/terminal_green.svg";
import Linux from "../../assets/images/gabriel-heinzer-unsplash.jpg";
import Sudoku from "../../assets/images/richard-bell-unsplash.jpg";

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
    name: "Bash Shell (University Project)",
    img: Linux,
    deployed: "",
    description:
      "A custom linux shell built with C that mimics the behavior of the Bash shell.",
  },
  {
    name: "Sudoku Checker (University Project)",
    img: Sudoku,
    deployed: "",
    description:
      "A C program that uses threads and processes to parallely validate a sudoku game board",
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
  let mounted = false;

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
