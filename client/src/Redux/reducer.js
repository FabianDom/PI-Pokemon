const initialState = {
  pokemons: [],
  types: [],
  allPokemons: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_TYPES":
      const allPokemons = state.allPokemons;
      const typeFilter =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((pok) => pok.types === action.payload);
      return {
        ...state,
        pokemons: typeFilter,
      };

    case "FILTER_CREATED":
      const filterCreated =
        action.payload === "createdDB"
          ? state.allPokemons.filter((p) => p.createdInDb)
          : state.allPokemons.filter((p) => !p.createdInDb);
      return {
        ...state,
        pokemons: filterCreated,
      };
    case "ORDER_NAME":
      return {
        ...state,
        orderName: action.payload,
      };
    case "ORDER_ATTACK":
      return {
        ...state,
        orderAttack: action.payload,
      };

    default:
      return state;
  }
}
