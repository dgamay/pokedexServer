import express from "express"; /* otra forma de llamar express */

import pokemonControllers from "../conttroller/pokemon.controller.js";
const router =express.Router()

router.get("/hello/",pokemonControllers.hiTrainer); 

router.post("/hello/:id",pokemonControllers.crear);

router.put("/hello/:id",pokemonControllers.actualizar);

router.delete("/hello:id",pokemonControllers.borrar);

export default  router;
    