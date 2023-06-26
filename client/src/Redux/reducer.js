const initialState = {
  pokemons: [],
  types: [],
  detail: {},
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
    case "POST_POKEMONS":
      return {
        ...state,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "FILTER_TYPES":
      const allPokemons = state.allPokemons;
      const typeFilter =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((pok) =>
              pok.types.some((p) => p.name === action.payload)
            );

      return {
        ...state,
        pokemons: typeFilter,
      };
    case "GET_DETAIL":
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload,
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
      const sortName =
        action.payload === "Ascendente"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortName,
      };
    case "ORDER_ATTACK":
      const sortAttack =
        action.payload === "Max"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortAttack,
      };

    default:
      return state;
  }
}
