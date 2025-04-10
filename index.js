import express from "express"; /* se declara la variable para poder trabajar con express */
import dotenv from"dotenv";
import mongoose from "mongoose";

/*  DE AQUIPARA */
import pokemonRoutes from "./routes/pokemon.routes.js"

dotenv.config();
const app=express(); /* Se crea una instancia del express */
const PORT =(process.env.PORT|| 3000);

app.set("port",PORT) 
app.use(express.json())
app.use("/api/pokemon",pokemonRoutes);

app.get("/",(req,res)=> {
    console.log("hola entrenador");/*Respuesta enviada a consola  */
    res.send('Hola entrenador1'); /* Respuesta envia da al postman (Usuario) */
    
});
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("CONECTADO A LA DB"))
.catch((Error)=> console.error(Error));



app.listen(PORT,()=>{
    console.log(`listen in port ${PORT}`);
    
})