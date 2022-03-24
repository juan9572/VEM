const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos
const { appConfig } = require('../../config');

const PublicitarioSchema = new mongoose.Schema({
    _id:{
        type: String,
        require: true,
        unique: true,
        min: 3,
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
        max: 20,
        min: 3
    },
    telefono:{
        type: String,
        require: true,
        min: 6
    },
    categoriaPublicidad:{type:String},
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