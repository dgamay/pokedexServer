import express from "express"; /* otra forma de llamar express */

import pokemonControllers from "../conttroller/pokemon.controller.js";
import pokemonStatusController from "../conttroller/pokemonStatus.controller.js";
const router =express.Router()

router.get("/hello/",pokemonControllers.hiTrainer); /* OOK */

// router.post("/",pokemonControllers.crear);

router.get("/",pokemonControllers.getPokemon);

router.get("/:pokemon_id",pokemonControllers.getPokemonByIdPokemon);

router.put("/catch/:pokemon_id",pokemonStatusController.catchViewPokemonById);

router.post("/view",pokemonStatusController.changeStatusPokemonByIdPokemon);

// router.delete("/:id",pokemonControllers.borrar);/* PENDIENTE IMPLEMENTAR */

export default  router;   