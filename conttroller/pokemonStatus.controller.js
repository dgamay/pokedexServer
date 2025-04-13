import Pokemon from "../models/pokemon.model.js";
import fetchPokemon from "../services/fetchPokemon.js";

const changeStatusPokemonByIdPokemon = async (req, res) => {
  try {
    console.log(req.body.pokemon_id);
    const statusInPokeapi = await fetchPokemon(req.body.pokemon_id);
    console.log(statusInPokeapi);

    if (statusInPokeapi == 404) {
      return res.status(404).json({
        message: "Pokemon not exist",
        status: 404,
        data: null,
      });
    }
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    return res.status(201).json(pokemon);
  } catch (error) {
    res.status(500).send(`el error ess: ${error.message}`);
  }
};

const catchViewPokemonById = async (req, res) => {
  try {
    const pokemon_id = req.params.pokemon_id;
    const pokemonNew = {
      pokemon_id: pokemon_id,
      view: true,
      catch: true,
      in_team: false,
    };
    let filter = { pokemon_id: pokemon_id };
    const pokemon = await Pokemon.findOneAndReplace(filter, pokemonNew, {
      new: true,
    });
    if (!pokemon) {
      return res.status(404).json({
        message: "Pokemon not seen yet",
        status: 404,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Ok",
      status: 200,
      data: pokemon,
    });
  } catch (error) {
    res.status(500).json(`El error es: ${error.message}`);
  }
};

const addPokemonInTeamById = async (req, res) => {
  try {
    let pokemon = new Pokemon(req.body);
    console.log(pokemon);
    const pokemonCatch = !pokemon.catch;
    const pokemon_id = req.params.pokemon_id;
    console.log(`Poquemon con id ${pokemon_id} capturado: ${!pokemonCatch}`);
    const pokemonNew = {
      pokemon_id: pokemon_id,
      view: true,
      catch: true,
      in_team: true,
    };
    let filter = { pokemon_id: pokemon_id, catch: pokemonCatch };
    pokemon = await Pokemon.findOneAndReplace(filter, pokemonNew, {
      new: true,
    });
    
    if (!pokemon) {
      return res.status(404).json({
        message: "Pokemon not catch yet",
        status: 404,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Ok",
      status: 200,
      data: pokemon,
    });
  } catch (error) {
    res.status(500).json(`como seria ${error.message}`);
  }
};

export default {
  catchViewPokemonById,
  changeStatusPokemonByIdPokemon,
  addPokemonInTeamById,
};
