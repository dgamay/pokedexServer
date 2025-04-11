import express from "express"; /* otra forma de llamar express */

import pokemonControllers from "../conttroller/pokemon.controller.js";
import pokemonStatusController from "../conttroller/pokemonStatus.controller.js";
const router =express.Router()

router.get("/hello/",pokemonControllers.hiTrainer); 

router.post("/:id",pokemonControllers.crear);

router.get("/",pokemonControllers.getPokemon);

router.get("/:pokemon_id",pokemonControllers.getPokemonByIdPokemon);

router.put("//:id",pokemonControllers.actualizar);

router.delete("/hello:id",pokemonControllers.borrar);

router.put("/catch/:pokemon_id",pokemonStatusController.catchViewPokemonById);

router.get("/catch/:pokemon_id",pokemonStatusController.viewPokemon);


export default  router;
    