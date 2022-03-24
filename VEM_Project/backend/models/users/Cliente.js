const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos

const UsuarioSchema = new mongoose.Schema({
    _id:false,
    username:{
        type: String,
        require: true,
        unique: true,
        min: 3,
        max: 30
    },
    email:{
        type: String,
        require: true,
        max: 60,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min:6
    },
    age:{
        type: Number,
        require: true,
        max:110,
        min:5
    }
    },{timestamps: true})
   

module.exports = mongoose.model("Usuario",UsuarioSchema); //Se crea el modelo dentro de la base de datos