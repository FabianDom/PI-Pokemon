import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Styles from "./Pokemon.module.css";
export default function Pokemon({ id, name, image, types }) {
  return (
    <div className={Styles.div}>
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
