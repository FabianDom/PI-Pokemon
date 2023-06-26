import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Styles from "./LandingPage.module.css";
import Image from "../Images/pikachu.png";

function LandingPage() {
  return (
    <div className={Styles.div}>
      <h1 className={Styles.h1}>¡WELCOME TO THE BATTLE!</h1>
      <div>
        <img
          className={Styles.img}
          src={Image}
          alt=""
          width="180"
          height="180"
        />
      </div>
      <Link to="/home">
        <button className={Styles.button}>GO</button>
      </Link>
    </div>
  );
}
export default LandingPage;
