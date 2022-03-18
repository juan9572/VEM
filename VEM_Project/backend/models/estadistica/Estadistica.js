const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const EstadisticaSchema = new mongoose.Schema(
    { //Creamos la tabla de usuarios
        evento:{
            type: String,
            require: true,
            min: 3,
            max: 30
        },
    },
    {timestamps: true}); 

module.exports = mongoose.model("Estadistica",EstadisticaSchema); //Se crea el modelo dentro de la base de datos