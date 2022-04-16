const router = require('express').Router();//Api para creación de usuarios para la app
const Cliente = require('../models/users/Cliente'); //Importamos los modelos
const bcrypt = require('bcrypt');// Librearia para poder encriptar datos

// Registrar cliente
router.post('/register',async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newCliente = new Cliente({
            username:req.body.username,
            email:req.body.email,
            age: req.body.age,
            password:hashedPassword
        });
        const cliente = await newCliente.save();
        res.status(200).json(cliente);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

// Logear cliente
router.post('/login',async (req, res) => {
    try{
        //Encontrar si el cliente esta registrado
        const cliente = await Cliente.findOne({username: req.body.username}).lean();
        if(!cliente){ //Si no existe el usuario se devuelve un error
            return res.status(400).json("Nombre de usuario o contraseña incorrectos");
        }
        //Validar la contraseña
        const validarPassword = await bcrypt.compare(req.body.password, cliente.password);
        if(!validarPassword){//Si no coincide la clave se devuelve un error
            console.log("Contraseña mala");
            return res.status(400).json("Nombre de usuario o contraseña incorrectos");
        }
        //Devolver respuesta
        res.status(200).json(cliente);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;