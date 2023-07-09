import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import Styles from "./Pokemon.module.css";
import { deletePokemonDb } from "../../Redux/actions";
import imgSucces from "../Images/succes.png";
import swal from "sweetalert";
export default function Pokemon({ id, name, image, types, createdInDb }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deletePokemonDb(id));
    swal({
      title: "Pokemon Deleted",
      icon: imgSucces,
      button: "OK",
      className: Styles["swal"],
    });
  }
  function deleteButton() {
    if (createdInDb) {
      return (
        <button className={Styles.button} onClick={() => handleDelete(id)}>
          X
        </button>
      );
    }
    return null;
  }
  return (
    <div className={Styles.div}>
      {deleteButton()}

      <Link to={`/pokemons/${id}`} key={id} style={{ textDecoration: "none" }}>
        <img src={image} alt="Pokemon" width="" height="" />
        <h3 className={Styles.h2}>{name.toUpperCase()}</h3>

        <h4 className={Styles.h4}>
          {types &&
            types.map((type, index) => {
              return (
                <span className={Styles.span} key={index}>
                  {type.name.charAt(0).toUpperCase() +
                    type.name.slice(1).toLowerCase()}
                </span>
              );
            })}
        </h4>
      </Link>
    </div>
  );
}
