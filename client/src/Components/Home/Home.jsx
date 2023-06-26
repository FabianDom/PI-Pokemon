import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";
import {
  filterTypes,
  filterCreated,
  orderName,
  orderAttack,
} from "../../Redux/actions";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../Images/Pokemon-Logo.png";
import Styles from "./Home.module.css";


export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    // despachamos la accion cada vez que se monta la app.
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  // -----------------------Paginado-----------------------------------//
  const [currentPage, setCurrentPage] = useState(1); // Pagina actual
  const [pokemonPage, setpokemonPage] = useState(12); // Pokemons por Pagina
  const lastPokemon = currentPage * pokemonPage;
  const firstPokemon = lastPokemon - pokemonPage;
  const pagePokemon = allPokemons.slice(firstPokemon, lastPokemon);
  function pagination(numberPage) {
    setCurrentPage(numberPage);
  }
  // ------------------------------------------------------------------//

  //---------------------------FiltersAndOrder------------------------ //

  const [orderFilters, setOrderFilters] = useState({
    filterType: "All",
    filterCreated: "All",
    orderName: "All",
    orderAttack: "All",
  });

  function handleFilterType(e) {
    dispatch(filterTypes(e.target.value));
    setOrderFilters({ filterType: e.target.value });
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setOrderFilters({ filterCreated: e.target.value });
  }

  function handleOrderName(e) {
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
    setOrderFilters({
      orderName: e.target.value,
    });
  }
  function handleOrderAttack(e) {
    dispatch(orderAttack(e.target.value));
    setCurrentPage(1);
    setOrderFilters({
      orderAttack: e.target.value,
    });
  }

  // ------------------------Recargar Pokemons---------------------------//
  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    setOrderFilters((prevState) => ({
      ...prevState,
      filterType: "All",
      filterCreated: "All",
      orderName: "All",
      orderAttack: "All",
    }));
  }

  return (
    <div>
      {Object.keys(allPokemons).length === 0 ? (
        <div className={Styles.divLoad}>
          <div>
            <h1 className={Styles.h1}>Loading...</h1>
          </div>
        </div>
      ) : (
        <>
          <div className={Styles.div}>
            <button
              className={Styles.buttonAll}
              onClick={(e) => {
                handleOnClick(e);
              }}
            >
              All Pokemons
            </button>
            <img
              className={Styles.image}
              src={Logo}
              alt="logo"
              width="200px"
              height="120px"
            />
            <Link to="/pokemon">
              <button className={Styles.buttonCreate}> Create Pokemon</button>
            </Link>
          </div>
          <div>
            <SearchBar />
          </div>
          <div className={Styles.divSelect}>
            <select
              className={Styles.select}
              value={orderFilters.filterType}
              onChange={(e) => handleFilterType(e)}
            >
              <option value="All">All Types</option>
              {allTypes.map((type) => (
                <option value={type.name} key={type.name}>
                  {type.name.charAt(0).toUpperCase() +
                    type.name.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <select
              className={Styles.select}
              value={orderFilters.filterCreated}
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="All">Created</option>
              <option value="createdDB">DB</option>
              <option value="createdApi">Api</option>
            </select>
            <select
              className={Styles.select}
              value={orderFilters.orderName}
              onChange={(e) => handleOrderName(e)}
            >
              <option value="All">Order</option>
              <option value="Ascendente">A-Z</option>
              <option value="Descendente">Z-A</option>
            </select>
            <select
              className={Styles.select}
              value={orderFilters.orderAttack}
              onChange={(e) => handleOrderAttack(e)}
            >
              <option value="All">Attack</option>
              <option value="Max">Max</option>
              <option value="Min">Min</option>
            </select>
          </div>

          <div className={Styles.divPokemon}>
            {pagePokemon?.map((pk) => (
              <div key={pk.id}>
                <Pokemon
                  id={pk.id}
                  name={pk.name}
                  image={pk.image}
                  types={pk.types}
                />
              </div>
            ))}
          </div>
          <div>
            <Pagination
              pokemonPage={pokemonPage}
              allPokemons={allPokemons.length}
              pagination={pagination}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
