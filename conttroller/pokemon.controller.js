import Pokemon from "../models/pokemon.model.js"; // Importa el modelo de datos Pokemon desde la ubicación especificada. Se asume que este modelo está definido con Mongoose para interactuar con la base de datos.
import fectPokemon from "../services/fetchPokemon.js"; // Importa la función fectPokemon desde el servicio fetchPokemon. Se asume que esta función realiza una llamada a una API externa para obtener datos de un Pokémon.

// Controlador para la ruta que saluda al entrenador.
const hiTrainer = async (req, res) => {
  try {
    // Intenta enviar una respuesta exitosa con un código de estado 200 (OK) y un mensaje.
    res.status(200).send("hola desde el controlador");
  } catch (error) {
    // Si ocurre algún error en el bloque try, captura el error y envía una respuesta de error con un código de estado 500 (Internal Server Error) y un JSON que contiene el mensaje del error.
    res.status(500).json({ error: error.message });
  }
};

// Controlador para la ruta de creación de un nuevo Pokémon.
const crear = async (req, res) => {
  try {
    // Crea una nueva instancia del modelo Pokemon utilizando los datos recibidos en el cuerpo de la solicitud (req.body). Se asume que req.body contiene los campos necesarios para crear un Pokémon según el esquema definido en el modelo Pokemon.
    const pokemon = new Pokemon(req.body);
    // Guarda la nueva instancia del Pokémon en la base de datos de forma asíncrona.
    await pokemon.save();
    // Si la creación es exitosa, devuelve una respuesta con un código de estado 201 (Created) y un JSON que contiene el Pokémon recién creado.
    return res.status(201).json(pokemon);
  } catch (error) {
    // Si ocurre algún error durante la creación o el guardado, captura el error y envía una respuesta de error con un código de estado 500 y un JSON con el mensaje del error.
    res.status(500).json({ error: error.message });
  }
};

// Controlador para la ruta que obtiene todos los Pokémon de la base de datos.
const getPokemon = async (req, res) => {
  try {
    // Busca todos los documentos de la colección Pokemon en la base de datos de forma asíncrona.
    const pokemones = await Pokemon.find();
    // Si la búsqueda es exitosa, devuelve una respuesta con un código de estado 200 y un JSON que contiene un array con todos los Pokémon encontrados.
    res.status(200).json(pokemones);
  } catch (error) {
    // Si ocurre algún error durante la búsqueda, captura el error y envía una respuesta de error con un código de estado 500 y un JSON con el mensaje del error.
    res.status(500).json({ error: error.message });
  }
};

// Controlador para la ruta que obtiene un Pokémon por su ID único (pokemon_id) definido en la base de datos.
const getPokemonByIdPokemon = async (req, res) => {
  try {
    // Extrae el valor del parámetro 'pokemon_id' de la URL de la solicitud.
    const pokemonId = req.params.pokemon_id;
    // Busca un documento en la colección Pokemon donde el campo 'pokemon_id' coincida con el valor extraído.
    let pokemon = await Pokemon.findOne({ pokemon_id: pokemonId });
    // Si no se encuentra ningún Pokémon con el ID proporcionado en la base de datos.
    if (!pokemon) {
      // Crea un objeto Pokémon con la información básica (pokemon_id, y tres flags booleanos inicializados en falso). Esto sugiere que se podría estar creando un registro "fantasma" o inicial para un Pokémon que aún no se ha detallado completamente en la base de datos.
      pokemon = {
        pokemon_id: pokemonId,
        view: false,
        catch: false,
        in_team: false,
      };
    }
    // Llama a la función fectPokemon para obtener los datos detallados del Pokémon desde una fuente externa (API). Le pasa el ID del Pokémon y el objeto Pokémon encontrado (o el objeto básico creado).
    const pokemonData = await fectPokemon(pokemonId, pokemon);
    // Si la función fectPokemon devuelve 404, significa que el Pokémon con el ID proporcionado no se encontró en la API externa.
    if ( pokemonData == 404) {
      // Devuelve una respuesta con un código de estado 404 (Not Found) y un JSON indicando que el Pokémon no fue encontrado, junto con un estado 404 y datos nulos.
      return res.status(404).json({
        message: "pokemon no found" ,
        status  : 404,
        data    :null
        });
    }
    // Si se encontraron los datos del Pokémon en la API externa, devuelve una respuesta con un código de estado 200 (OK) y un JSON con un mensaje de éxito, un estado 200 y los datos del Pokémon obtenidos.
    return res.status(200).json({
        message : "OK" ,
        status  : 200,
        data    :pokemonData
    });

  } catch (error) {
    // Si ocurre algún error durante la búsqueda o la llamada a la API, captura el error y envía una respuesta de error con un código de estado 500 y un JSON con el mensaje del error.
    res.status(500).json({ error: error.message });
  }
};

// Controlador para la ruta de actualización de un Pokémon existente.
const actualizar = async (req, res) => {
  try {
    // Imprime "actualizar" en la consola del servidor (esto es probablemente para depuración).
    console.log("actualizar");
    // Intenta enviar una respuesta exitosa con un código de estado 200 y un mensaje (la lógica de actualización real aún no está implementada aquí).
    res.status(200).send("hola desde actualizar");
  } catch (error) {
    // Si ocurre algún error, captura el error y envía una respuesta de error con un código de estado 500 y un JSON con el mensaje del error.
    res.status(500).json({ error: error.message });
  }
};

// Controlador para la ruta de borrado de un Pokémon.
const borrar = async (req, res) => {
  try {
    // Imprime "borrado con exito" en la consola del servidor (probablemente para depuración).
    console.log("borrado con exito");
    // Intenta enviar una respuesta exitosa con un código de estado 200 y un mensaje (la lógica de borrado real aún no está implementada aquí).
    res.status(200).send("hola desde borrar");
  } catch (error) {
    // Si ocurre algún error, captura el error y envía una respuesta de error con un código de estado 500 y un JSON con el mensaje del error.
    res.status(500).json({ error: error.message });
  }
};

// Exporta un objeto que contiene todas las funciones controladoras para que puedan ser utilizadas en otros archivos (por ejemplo, en las definiciones de rutas).
export default {
  hiTrainer,
  crear,
  getPokemon,
  getPokemonByIdPokemon,
  actualizar,
  borrar,
}; /* exportamos la funcion hiTrainer */