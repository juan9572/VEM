const router = require('express').Router();//Api para creación de PINS para el mapa
const Pin = require('../models/map/Pin'); //Importamos los modelos
const fs = require('fs');

//Creación de un PIN
router.post("/",async (req,res)=>{
    const newPin = new Pin(req.body);
    try{
        const savePin = await newPin.save();
        const pins = await Pin.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Backup_Collection.json',JSON.stringify(pins)); //Se crea el backup, para tener las bases de datos sincronizadas
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

module.exports = router;