import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../Redux/actions";
import Styles from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemonDetail = useSelector((state) => state.detail);
  console.log(pokemonDetail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const PowerBar = (property, value) => {
    const barPower = `${value}%`;

    return (
      <div>
        <h3>
          {property}: {value}
        </h3>
        <div className={Styles.powerBar}>
          <div className={Styles.powerFill} style={{ width: barPower }}></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {Object.keys(pokemonDetail).length === 0 ? (
        <div className={Styles.divLoad}>
          <div>
            <h1 className={Styles.h1}>Loading Information..</h1>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/home">
            <button className={Styles.button}>Return to battle</button>
          </Link>
          <div className={Styles.divCard}>
            <div className={Styles.leftSection}>
              <h1>{pokemonDetail.name.toUpperCase()}</h1>
              <img src={pokemonDetail.image} alt="Pokemon" />
              <h3>Types</h3>
              <h3>
                {pokemonDetail.types.map(
                  (t) =>
                    t.name.charAt(0).toUpperCase() +
                    t.name.slice(1).toLowerCase() +
                    " "
                )}
              </h3>
            </div>
            <div className={Styles.rightSection}>
              {PowerBar("HP", pokemonDetail.hp)}
              {PowerBar("Attack", pokemonDetail.attack)}
              {PowerBar("Defense", pokemonDetail.defense)}
              {PowerBar("Speed", pokemonDetail.speed)}
              {PowerBar("Height", pokemonDetail.height)}
              {PowerBar("Weight", pokemonDetail.weight)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
