import express from "express"; /* otra forma de llamar express */

import pokemonControllers from "../conttroller/pokemon.controller.js";
import pokemonStatusController from "../conttroller/pokemonStatus.controller.js";
const router =express.Router()

router.get("/hello/",pokemonControllers.hiTrainer); /* OOK */

router.post("/",pokemonControllers.crear);  /* Actualmnte si fucion real */

router.get("/",pokemonControllers.getPokemon);  /* OOK */

router.get("/:pokemon_id",pokemonControllers.getPokemonByIdPokemon); /* OK */

router.put("/catch/:pokemon_id",pokemonStatusController.catchViewPokemonById); /* OK */

router.post("/view",pokemonStatusController.changeStatusPokemonByIdPokemon); /* OK */

router.put("/team/:pokemon_id",pokemonStatusController.addPokemonInTeamById);

// router.delete("/:id",pokemonControllers.borrar);/* PENDIENTE IMPLEMENTAR */

export default  router;   