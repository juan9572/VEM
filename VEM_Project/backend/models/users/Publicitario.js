const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos
const { appConfig } = require('../../config');

const ResenaSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 30
        },
        mensaje: {
            type: String,
            require: true,
            min: 3
        },
        rating: {
            type: Number,
            require: true,
            min: 0,
            max: 5
        },

    },{ timestamps: true });

const EstadisticaSchema = new mongoose.Schema(
    { //Creamos la tabla de usuarios
        datos: [{
            type: String,
            require: true,
            min: 1,
            max: 10
        }],
    });


const PinSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 3
    },
    description: {
        type: String,
        require: true,
        min: 3
    },
    category: {
        type: String,
        require: true,
        min: 3
    },
    sitio:{
        type: String,
        require:false
    },
    rating: {
        type: Number,
        
        min: 0,
        max: 5
    },
    latitude: {
        type: Number,
        require: true
    },
    long: {
        type: Number,
        require: true
    },
    link: {
        type: String,
        require: true,
        min: 6
    },
    fechaInicio: {
        type: Date,
        require: true
    },
    fechaFinalizacion: {
        type: Date,
        require: true
    },
    imgUrl: {
        type: String,
        require: false
    },
    imgEventoPasado: {
        type: String,
        require: false
    },
    comentarios: [{
        type: ResenaSchema,
        default: undefined
    }],
    estadistica:[{
        type:EstadisticaSchema,
        default:undefined
    }]
},
    { timestamps: true });

PinSchema.methods.setImgUrl = function setImgUrl(filename) {
    const { host, port } = appConfig
    this.imgUrl = `${host}:${port}/public/${filename}`
}

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
    categoriaPublicidad:[{type:String}],
    eventosCreados:[{
        type:PinSchema,
        default: undefined
    }],
},{timestamps: true})

module.exports = mongoose.model("Publicitario",PublicitarioSchema); //Se crea el modelo dentro de la base de datos