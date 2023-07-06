import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../../Redux/actions";
import Validate from "./Validate";
import Styles from "./Form.module.css";
import swal from "sweetalert";
import imgError from "../Images/error.png";
import imgSucces from "../Images/succes.png";

export default function Form() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const [errors, setErrors] = useState({}); // estado manejar errores de validacion.
  const [errorInput, setErrorInput] = useState(false); // estado para manejar el error de cada input
  const [form, setForm] = useState({
    // estado del formulario
    name: "",
    image:
      "https://i.pinimg.com/originals/e2/7b/7d/e27b7d18b01ae4765133f4aec4aaf61d.png",
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
    e.preventDefault();
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
    e.preventDefault();
    if (e.target.value === "All") {
      return; // No hacer nada
    }
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
    const existingName = pokemons.map((pokemon) => pokemon.name.toLowerCase());
    const existingImage = pokemons.map((pokemon) => pokemon.image);
    const errorsValue = Object.values(errors);
    if (errorsValue.length === 0 && form.name.length) {
      if (existingName.includes(form.name.toLowerCase())) {
        swal({
          title: "The pokemon name already exists",
          icon: imgError,
          button: "OK",
          className: Styles["swal"],
        });
      } else {
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
      }
    } else {
      let errorMessages = errorsValue.filter((error) => error !== "");
      swal({
        title: "Please complete all fields",
        icon: imgError,
        button: "OK",
        className: Styles["swal"],
      });
    }
  }

  function handleImageClick() {
    if (
      form.image ===
      "https://i.pinimg.com/originals/e2/7b/7d/e27b7d18b01ae4765133f4aec4aaf61d.png"
    ) {
      setForm({
        ...form,
        image: "",
      });
    }
  }

  function handleImageBlur() {
    if (!form.image) {
      setForm({
        ...form,
        image:
          "https://i.pinimg.com/originals/e2/7b/7d/e27b7d18b01ae4765133f4aec4aaf61d.png",
      });
      setErrors(
        Validate({
          ...form,
          image:
            "https://i.pinimg.com/originals/e2/7b/7d/e27b7d18b01ae4765133f4aec4aaf61d.png",
        })
      );
    }
  }

  return (
    <div>
      <Link to="/home">
        <button className={Styles.buttonBack}>Return to battle</button>
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
          {form.image ===
            "https://i.pinimg.com/originals/e2/7b/7d/e27b7d18b01ae4765133f4aec4aaf61d.png" && (
            <p className={Styles.message}>Default Image</p>
          )}
          <input
            className={Styles.input}
            type="url"
            value={form.image}
            name="image"
            placeholder="URL"
            onClick={handleImageClick}
            onBlur={handleImageBlur}
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
          {errorInput.hp && form.hp && (
            <p className={Styles.error}>{errors.hp}</p>
          )}
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
            <option>All</option>
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
