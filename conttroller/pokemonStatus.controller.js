import Pokemon from "../models/pokemon.model.js";
import fetchPokemon from "../services/fetchPokemon";

const viewPokemon = async (req, res)=>{
    try {
        const pokemon = new Pokemon(req.body);
        await pokemon.save();
        return res.status(201).json(pokemon);
    } catch (error) {
        res.status(500).send(`el error es: ${error.message}`);
    }
};

const catchViewPokemonById = async (req, res)=>{
    try {
        const pokemon_id = req.params.pokemon_id;
        const pokemonNew ={
            pokemon_id:pokemon_id,
            view:true,
            catch:true,
            in_team:false
        }
        let filter = {pokemon_id:pokemon_id};
        const pokemon = await Pokemon.findOneAndReplace(filter,pokemonNew,{new:true});
        if(!pokemon){
            return res.status.json({
                message: "Pokemon not found",
                status:404,
                data: null
            })
        }
        return res.status.json({
            message: "Ok",
            status:200,
            data: pokemon
        })
    } catch (error) {
        res.status(500).json(`El error es: ${error.message}`);
    }
}

export default {catchViewPokemonById, viewPokemon};