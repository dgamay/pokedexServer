import Pokemon from "../models/pokemon.model.js";

const hiTrainer =async (req, res) =>{
    try {
        res.status (200).send ("hola desde el controlador");
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const crear =async (req, res) =>{
    try {
        const pokemon = Pokemon(req.body)
        await pokemon.save()
        return res.status(201).json(pokemon)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const actualizar = async (req,res) =>{
    try {
        console.log("actualizar");
        res.status(200).send("hola desde actualizar");
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const borrar =async (req,res) =>{
    try {
        console.log("borrado con exito");
        res.status(200).send("hola desde borrar");
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


export default {hiTrainer, crear, actualizar, borrar};/* exportamos la funcion hiTrainer */