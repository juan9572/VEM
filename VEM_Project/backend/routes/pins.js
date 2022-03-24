const router = require('express').Router();//Api para creación de PINS para el mapa
const Pin = require('../models/map/Pin'); //Importamos los modelos
const Publicitario = require('../models/users/Publicitario');
const fs = require('fs');
const upload = require('../libs/storage')
//Creación de un PIN
router.post("/",upload.single('image'),async (req,res)=>{
    const newPin = new Pin(req.body);
    try{
        const savePin = await newPin.save();
        const pins = await Pin.find().lean();
        if (req.file){
            const { filename } = req.file
            newPin.setImgUrl(filename)
        }
        fs.writeFileSync('./database/collections/VEM_BD_Backup_Collection.json',JSON.stringify(pins));
         //Se crea el backup, para tener las bases de datos sincronizadas
        res.status(200).json(savePin);
    }catch(err){
        res.status(500).json(err);
    }
});

//Obtener todos los pins del mapa
router.get("/", async (req, res) => {
    try{
        const pins = await Pin.find().lean();
        res.status(200).json(pins);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/finalizados", async (req, res) => {
    try{
        const fecha = new Date();
        const eventos = await Pin.find({fechaFinalizacion:{$lt:fecha}});
        res.status(200).json(eventos);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/finalEvento", async (req,res) =>{
    try{
        const evento = await Pin.findById(req.id);
        res.status(200).json(evento);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;