import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsName } from "../../Redux/actions";
import Styles from "./SearchBar.module.css";
import imgError from "../Images/error.png";
import swal from "sweetalert";

export default function SearchBar({ currentPage }) {
  const dispatch = useDispatch();
  const [names, setNames] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleInput(e) {
    setNames(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (names === "") {
      swal({
        title: "Enter a Pokemon name",
        icon: imgError,
        button: "OK",
        className: Styles["swal"],
      });
    } else {
      e.preventDefault();
      dispatch(getPokemonsName(names.toLowerCase())).then((name) => {
        if (!name) {
          swal({
            title: "Pokemon does not exist",
            icon: imgError,
            button: "OK",
            className: Styles["swal"],
          });
        } else {
          currentPage(1);
        }
      });

      setTimeout(() => {
        setNames("");
      }, 4000);
    }
  }

  return (
    <div className={Styles.diviv}>
      <input
        className={Styles.input}
        type="text"
        value={names}
        placeholder="Search.."
        onChange={(e) => handleInput(e)}
      />
      <button
        className={Styles.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
