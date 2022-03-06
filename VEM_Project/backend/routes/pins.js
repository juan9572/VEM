const router = require('express').Router();//Api para creación de PINS para el mapa
const Pin = require('../models/map/Pin'); //Importamos los modelos

//Creación de un PIN
router.post("/",async (req,res)=>{
    const newPin = new Pin(req.body);
    try{
        const savePin = await newPin.save();
        res.status(200).json(savePin);
    }catch(err){
        res.status(500).json(err);
    }
});

//Obtener todos los pins del mapa
router.get("/", async (req, res) => {
    try{
        const pins = await Pin.find();
        res.status(200).json(pins);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;