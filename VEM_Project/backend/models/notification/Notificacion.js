const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const NotificacionSchema = new mongoose.Schema(
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
    },
    {timestamps: true}); 

module.exports = mongoose.model("Notificacion",NotificacionSchema); //Se crea el modelo dentro de la base de datos