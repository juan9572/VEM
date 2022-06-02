const router = require('express').Router();//Api para creación de usuarios para la app
const Cliente = require('../models/users/Cliente'); //Importamos los modelos
const bcrypt = require('bcrypt');// Librearia para poder encriptar datos
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

//Middleware
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../frontend/public/img'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async(req, res)=>{
    const cliente = await Cliente.findOneAndUpdate({"username": req.body.username}, {
        '$set': {
            'imagePerfil': req.file.filename
        }
    });
    await cliente.save();
    const clientes = await Cliente.find().lean();
    fs.writeFileSync('./database/collections/VEM_BD_Clientes_Backup_Collection.json',JSON.stringify(clientes));
    res.status(200).json(req.file.filename);
});

// Registrar cliente
router.post('/register', upload.single('image') ,async(req,res)=>{
    try{
        
        //Validamos que no se haya registrado con ese username, correo electronico y nit
        //Username
        if(await Cliente.findOne({username: req.body.username}).lean()){
            res.status(409).json({"field":"username","error":"Este nombre de usuario ya esta en uso"});
            return;
        }
        //Email
        if(await Cliente.findOne({email: req.body.email}).lean()){
            res.status(409).json({"field":"email","error":"Este email ya esta en uso"});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newCliente = new Cliente({
            username:req.body.username,
            email:req.body.email,
            age: req.body.age,
            password:hashedPassword,
            seguidos:[],
            imagePerfil: ""
        });
        const cliente = await newCliente.save();
        const credentials_cliente = {
            "username":newCliente.username,
            "rol":"C",
            "image":""
        };

        const clientes = await Cliente.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Clientes_Backup_Collection.json',JSON.stringify(clientes));
        //Se crea el backup, para tener las bases de datos sincronizadas

        res.status(200).json(credentials_cliente);
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
            return res.status(409).json({"error":"Nombre de usuario o contraseña incorrectos"});
        }
        //Validar la contraseña
        const validarPassword = await bcrypt.compare(req.body.password, cliente.password);
        if(!validarPassword){//Si no coincide la clave se devuelve un error
            return res.status(409).json({"error":"Nombre de usuario o contraseña incorrectos"});
        }
        //Devolver respuesta
        const credentials_cliente = {
            "username":cliente.username,
            "rol":"C",
            "image":cliente.imagePerfil?cliente.imagePerfil:""
        };
        res.status(200).json(credentials_cliente);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/getCliente", async (req, res) => {
    try{
        const cliente = await Cliente.findOne({username: req.body.username}).lean();
        if(!cliente){//Si no existe el usuario se devuelve un error
            return res.status(409).json({"error":"Nombre de usuario no encontrado"});
        }
        res.status(200).json(cliente);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/seguir", async (req, res) => {
    const namePubli = req.body[0]
    const nameCliente = req.body[1]
    try{
        const cliente = await Cliente.findOne({"username": nameCliente});
        let entre = false
        for(let i = 0; i < cliente.seguidos.length; i++){
            if(cliente.seguidos[i] == namePubli){
                cliente.seguidos.splice(i,1)
                await cliente.save()
                entre = true
            }
        }
        if(!entre){
            cliente.seguidos.push(namePubli)
            await cliente.save()
        }
        const clientes = await Cliente.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Clientes_Backup_Collection.json',JSON.stringify(clientes));
        res.status(200).json(!entre);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/preguntaSeguido", async (req, res) => {
    const namePubli = req.body[0]
    const nameCliente = req.body[1]
    try{
        const cliente = await Cliente.findOne({"username": nameCliente});
        let seguido = false
        for(let i = 0; i < cliente.seguidos.length; i++){
            if(cliente.seguidos[i] == namePubli){
                seguido = true
            }
        }
        res.status(200).json(seguido);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/actualizar", async (req, res) => {
    const currentUser = req.body.current
    delete req.body.current
    try {
        const actualizar = await Cliente.findOneAndUpdate({ "username": currentUser},
            {
                '$set': {
                    'email': req.body.email,
                    'age': req.body.age
                }
            });
        await actualizar.save()
        const clientes = await Cliente.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Clientes_Backup_Collection.json',JSON.stringify(clientes));
        
        res.status(200).json("ok");
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;