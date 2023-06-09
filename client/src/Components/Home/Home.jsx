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
  function handleFilterType(e) {
    dispatch(filterTypes(e.target.value));
    console.log(filterTypes);
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleOrderName(e) {
    dispatch(orderName(e.target.value));
  }
  function handleOrderAttack(e) {
    dispatch(orderAttack(e.target.value));
  }

  // ------------------------Recargar Pokemons---------------------------//
  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  return (
    <div>
      <Link to="/pokemons"> Crear Pokemon</Link>
      <h1>POKEMONS</h1>
      <div>
        <button
          onClick={(e) => {
            handleOnClick(e);
          }}
        >
          All Pokemons
        </button>
      </div>
      <div>
        <select onChange={(e) => handleFilterType(e)}>
          <option value="All">All Types</option>
          {allTypes.map((type) => (
            <option value={type.name}>{type.name}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Created</option>
          <option value="createdDB">DB</option>
          <option value="createdApi">Api</option>
        </select>
        <select>
          <option>Order</option>
        </select>
        <select>
          <option>Attack</option>
        </select>
      </div>

      <div>
        {pagePokemon?.map((pk) => {
          return (
            <div key={pk.id}>
              <Link to={"/home" + pk.id}>
                <Pokemon name={pk.name} image={pk.image} types={pk.types} />
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <Pagination
          pokemonPage={pokemonPage}
          allPokemons={allPokemons.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
