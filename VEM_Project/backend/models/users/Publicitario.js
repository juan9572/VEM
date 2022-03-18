const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos
const extendSchema = require('mongoose-extend-schema');
const { appConfig } = require('../../config');
const UsuarioSchema = require('../../models/users/Usario');

const PublicitarioSchema = extendSchema(UsuarioSchema,{
    nit:{
        type: String,
        require: true,
        max: 20,
        min: 3
    },
    telefono:{
        type: String,
        require: true,
        max: 10,
        min: 3
    },
    categoriaPublicidad:
        {
            type: String,
            require: true
        },
    imgUrl: {
        type: String,
        require: false
    }
},
{timestamps: true})

PublicitarioSchema.methods.setImgUrl = function setImgUrl(filename){
    const { host, port} = appConfig
    this.imgUrl = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model("Publicitario",PublicitarioSchema); //Se crea el modelo dentro de la base de datos