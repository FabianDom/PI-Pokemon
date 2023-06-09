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

export function filterTypes(payload) {
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
