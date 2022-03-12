const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const PublicitarioSchema = new mongoose.Schema(
    { //Creamos la tabla de los publicitarios
        username:{
            type: String,
            require: true,
            min: 3,
            max: 30
        },
        email:{
            type: String,
            require: true,
            max: 60,
            unique: true
        },
        nit:{
            type: String,
            require: true,
            max: 20,
            min: 3
        },
        categoriaPublicidad:
            {
                type: String,
                require: true
            }
        ,
        password:{
            type: String,
            require: true,
            min:6
        }
    },
    {timestamps: true}); // timestamp se encarga de hacer el createdAt y updatedAt automaticamente
                        // doc por si las dudas https://masteringjs.io/tutorials/mongoose/timestamps

module.exports = mongoose.model("Publicitario",PublicitarioSchema); //Se crea el modelo dentro de la base de datos