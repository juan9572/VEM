const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const PinSchema = new mongoose.Schema({
        username: {
            type: String,
            require: true
        },
        title: {
            type:String,
            require: true,
            min:3
        },
        description: {
            type:String,
            require: true,
            min: 3
        },
        rating: {
            type:Number,
            require: true,
            min:1, 
            max: 5
        },
        latitude: {
            type:Number,
            require: true
        },
        long: {
            type:Number,
            require: true
        },
        fechaEvento:{
            type:Date,
            require: true
        }
    },
    {timestamps: true});

    module.exports = mongoose.model("Pin",PinSchema); //Se crea el modelo dentro de la base de datos