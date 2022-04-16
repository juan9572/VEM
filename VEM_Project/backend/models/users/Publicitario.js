const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const PublicitarioSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
        min: 2,
        max: 35
    },
    email:{
        type: String,
        min:5,
        max: 60,
        require:true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    nit:{
        type: String,
        require: true,
        unique: true,
        max: 10,
        min: 10
    },
    telefono:{
        type: String,
        min: 6
    },
    categoriaPublicidad:[{type:String}]
},{timestamps: true})

module.exports = mongoose.model("Publicitario",PublicitarioSchema); //Se crea el modelo dentro de la base de datos