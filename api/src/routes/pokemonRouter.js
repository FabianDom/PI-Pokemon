const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db");
const {
  getPokemons,
  getAllPokemons,
  getDBPokemons,
  getPokemonsById,
  getPokemonsDbById,
  getPokemonsName,
  getPokemonsNameDb,
} = require("../controllers/pokemon");

router.get("/", async (req, res) => {
  try {
    // hacemos nuestra ruta get para buscar por nombre.
    const { name } = req.query;
    if (name) {
      // buscamos en la Api externa.
      let pokemons = await getPokemonsName(name);
      if (!pokemons) {
        // si no estan en la Api lo buscamos en DB.
        pokemons = await getPokemonsNameDb(name);
        if (!pokemons) {
          return res.status(404).send("Pokemon not found");
        }
      }
      // si encontramos el pokemon enviamos la respuesta.
      return res.status(200).json(pokemons);
    }
    // si no se busca por el nombre devolvemos todos los pokemones.
    const pokemonsAll = await getAllPokemons();
    return res.status(200).json(pokemonsAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:idPokemon", async (req, res) => {
  try {
    // se destructura el id por params.
    const { idPokemon } = req.params;
    // si tiene valor el id, inicializamos nuestra variable en null para buscar el pokemon.
    if (idPokemon) {
      let searchId = null;
      // se valida si el id no un es numero para buscarlo en la DB.
      if (isNaN(idPokemon)) {
        searchId = await getPokemonsDbById(idPokemon);
      } else {
        // si es numero lo buscamos en la api externa
        searchId = await getPokemonsById(idPokemon);
      }
      if (searchId) {
        // si tenemos un valor quiere decir que encontramos el pokemon y enviamos la respuesta.
        return res.status(200).json(searchId);
      }
    }
    // si el id no tiene valor devolvemos le mensaje.
    return res.status(404).send("Pokemon not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      createInDb,
    } = req.body;
    // se verifica que el nombre este disponible en la api.
    let searchName = await getPokemonsName(name);
    if (!searchName) {
      // si no esta en la api validamos en la DB
      searchName = await getPokemonsNameDb(name);
      if (searchName) {
        // si existe devolvemos una respuesta que existe y no se puede crear con ese nombre.
        return res.status(404).send("the Pokemon already exists");
      }
    }
    // si no existe lo creamos en nuestra DB
    let pokemonCreated = await Pokemon.create({
      id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createInDb,
    });
    let typeDB = await Type.findAll({
      where: { name: types },
    });
    pokemonCreated.addType(typeDB);
    return res.status(200).json(pokemonCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
