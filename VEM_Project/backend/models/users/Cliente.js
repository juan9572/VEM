const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const ClienteSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
        min: 2,
        max: 35
    },
    email:{
        type: String,
        require: true,
        max: 60,
        min:5,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min:6
    },
    age:{
        type: Number,
        max:110,
        min:-1
    },
    imagePerfil: {
        type: String,
        require: false
    },
    seguidos:[{
        type: String
    }]
    },{timestamps: true})
   

module.exports = mongoose.model("Cliente",ClienteSchema); //Se crea el modelo dentro de la base de datos