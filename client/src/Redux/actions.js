import axios from "axios";

export function getPokemons() {
  const endpoint = "http://localhost:3001/pokemons";
  return async (dispatch) => {
    const pokemons = await axios.get(endpoint);
    return dispatch({
      type: "GET_POKEMONS",

      payload: pokemons.data,
    });
  };
}

export function getTypes() {
  const endpoint = "http://localhost:3001/types";
  return async (dispatch) => {
    const types = await axios.get(endpoint);
    return dispatch({
      type: "GET_TYPES",
      payload: types.data,
    });
  };
}

export function getPokemonsName(name) {
  const endpoint = "http://localhost:3001/pokemons?name=";

  return async function (dispatch) {
    try {
      const namePokemon = await axios.get(endpoint + name);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: namePokemon.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemon(payload) {
  const endpoint = "http://localhost:3001/pokemons";
  return async function dispatch() {
    const response = await axios.post(endpoint, payload);
    return {
      type: "POST_POKEMONS",
      payload: response,
    };
  };
}
export function getDetail(id) {
  const endpoint = "http://localhost:3001/pokemons/";
  return async function (dispatch) {
    const detail = await axios.get(endpoint + id);
    //console.log(detail.data);
    return dispatch({
      type: "GET_DETAIL",
      payload: detail.data,
    });
  };
}
export function deletePokemonDb(id) {
  const endpoint = "http://localhost:3001/pokemons/";
  return async function (dispatch) {
    await axios.delete(endpoint + id);
    return dispatch({
      type: "DELETE_POKEMON",
      payload: id,
    });
  };
}
export function filterTypes(payload) {
  console.log(payload);
  return {
    type: "FILTER_TYPES",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function orderName(payload) {
  return {
    type: "ORDER_NAME",
    payload,
  };
}
export function orderAttack(payload) {
  return {
    type: "ORDER_ATTACK",
    payload,
  };
}
