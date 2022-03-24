const router = require('express').Router();//Api para creación de publicitarios para la app
const Publicitario = require('../models/users/Publicitario'); //Importamos los modelos
const bcrypt = require('bcrypt');// Librearia para poder encriptar datos
const upload = require('../libs/storage')
// Registrar publicitario
router.post('/register',upload.single('image'),async (req, res) => {
    try{
        //Generamos el password encriptandolo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        //Creamos la instancia de publicitario
        const newPublicitario = new Publicitario({
            _id:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            nit:req.body.nit,
            telefono:req.body.telefono,
            categoriaPublicidad:req.body.categoriaPublicidad
            
        });
        if (req.file){
            const { filename } = req.file
            newPublicitario.setImgUrl(filename)
        }
        //Guardamos el publicitario y se manda el response
        const publicitario = await newPublicitario.save();
        res.status(200).json(publicitario);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

// Logear publicitario
router.post('/login',async (req, res) => {
    try{
        //Encontrar si el usuario esta registrado
        const publicitario = await Publicitario.findOne({username: req.body.username}).lean();
        if(!publicitario){ //Si no existe el usuario se devuelve un error
            return res.status(400).json("Nombre de usuario o contraseña incorrectos");
        }
        //Validar la contraseña
        const validarPassword = await bcrypt.compare(req.body.password, publicitario.password);
        if(!validarPassword){//Si no coincide la clave se devuelve un error
            return res.status(400).json("Nombre de usuario o contraseña incorrectos");
        }
        //Devolver respuesta
        res.status(200).json(publicitario);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;