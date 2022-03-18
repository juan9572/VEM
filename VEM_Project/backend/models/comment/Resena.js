const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const ResenaSchema = new mongoose.Schema(
    { //Creamos la tabla de usuarios
        username:{
            type: String,
            require: true,
            min: 3,
            max: 30
        },
        mensaje: {
            type:String,
            require: true,
            min: 3
        },
        rating: {
            type:Number,
            require: true,
            min:0, 
            max: 5
        },

    },
    {timestamps: true}); 

module.exports = mongoose.model("Resena",ResenaSchema); //Se crea el modelo dentro de la base de datos