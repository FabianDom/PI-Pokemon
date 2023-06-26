import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../../Redux/actions";
import Validate from "./Validate";
import swal from "sweetalert";
import imgError from "../Images/error.png";
import imgSucces from "../Images/succes.png";
import Styles from "./Form.module.css";

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({}); // estado manejar errores de validacion.
  const [errorInput, setErrorInput] = useState(false); // estado para manejar el error de cada input
  const [form, setForm] = useState({
    // estado del formulario
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrorInput({
      ...form,
      [e.target.name]: true,
    });
    setErrors(
      Validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setForm({
      ...form,
      types: [...form.types, e.target.value],
    });
    setErrors(
      Validate({
        ...form,
        types: [...form.types, e.target.value],
      })
    );
  }
  function handleRemoveSelect(type) {
    setErrors(
      Validate({
        ...form,
        types: form.types.filter((ty) => ty !== type),
      })
    );
    setForm({
      ...form,
      types: form.types.filter((ty) => ty !== type),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && form.name.length) {
      dispatch(postPokemon(form));
      swal({
        title: "Pokemon Created",
        icon: imgSucces,
        button: "OK",
        className: Styles["swal"],
      });
      setForm({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
      });
      history.push("/home");
    } else {
      let errorMessages = Object.values(errors).filter((error) => error !== "");
      swal({
        title: "Please complete all fields",
        text: errorMessages.join("\n"),
        icon: imgError,
        button: "OK",
        className: Styles["swal"],
      });
    }
  }

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>

      <form className={Styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1 className={Styles.h1}>Create Pokemon</h1>
        <div>
          <label className={Styles.label}>Name:</label>
          <input
            className={Styles.input}
            type="text"
            value={form.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.name && form.name && (
            <p className={Styles.error}>{errors.name}</p>
          )}
        </div>
        <div>
          <label className={Styles.label}>Image:</label>
          <input
            className={Styles.input}
            type="url"
            value={form.image}
            name="image"
            placeholder="URL"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.image && form.image && (
            <p className={Styles.error}>{errors.image}</p>
          )}
        </div>
        <div>
          <label className={Styles.label}>HP:</label>
          <input
            className={Styles.input}
            type="number"
            value={form.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.hp && form.hp && <p className="error">{errors.hp}</p>}
        </div>
        <div>
          <label className={Styles.label}>Attack:</label>
          <input
            className={Styles.input}
            type="number"
            value={form.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.attack && form.attack && (
            <p className={Styles.error}>{errors.attack}</p>
          )}
        </div>
        <div>
          <label className={Styles.label}>Defense:</label>
          <input
            className={Styles.input}
            type="number"
            value={form.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.defense && form.defense && (
            <p className={Styles.error}>{errors.defense}</p>
          )}
        </div>
        <div>
          <label className={Styles.label}>Speed:</label>
          <input
            className={Styles.input}
            type="number"
            value={form.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.speed && form.speed && (
            <p className={Styles.error}>{errors.speed}</p>
          )}
        </div>
        <div>
          <label className={Styles.label}>Height:</label>
          <input
            className={Styles.input}
            type="number"
            value={form.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.height && form.height && (
            <p className={Styles.error}>{errors.height}</p>
          )}
        </div>
        <div>
          <label className={Styles.label}>Weight:</label>
          <input
            className={Styles.input}
            type="number"
            value={form.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          {errorInput.weight && form.weight && (
            <p className={Styles.error}>{errors.weight}</p>
          )}
        </div>
        <div>
          <label className={Styles.label}>Types:</label>
          <select className={Styles.select} onChange={handleSelect}>
            {types.map((ty) => (
              <option key={ty.name} value={ty.name}>
                {ty.name.charAt(0).toUpperCase() +
                  ty.name.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          {errors.types && form.types && (
            <p className={Styles.error}>{errors.types}</p>
          )}
          <div className={Styles.div}>
            {form.types.map((type) => (
              <span className={Styles.spanType} key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                <button
                  className={Styles.buttonType}
                  onClick={() => handleRemoveSelect(type)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <button className={Styles.button} type="submit">
            Create Pokemon
          </button>
        </div>
      </form>
    </div>
  );
}
