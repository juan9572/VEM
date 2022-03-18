const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos
const extendSchema = require('mongoose-extend-schema');

const UsuarioSchema = extendSchema(UsuarioSchema,{
    age:{
        type: Number,
        require: true,
        max:110,
        min:5
    }
    },{timestamps: true})
   

module.exports = mongoose.model("Usuario",UsuarioSchema); //Se crea el modelo dentro de la base de datos