const router = require('express').Router();//Api para creación de publicitarios para la app
const Publicitario = require('../models/users/Publicitario'); //Importamos los modelos
const Cliente = require('../models/users/Cliente');
const bcrypt = require('bcrypt');// Librearia para poder encriptar datos
const fs = require('fs');
const upload = require('../libs/storage')
// Registrar publicitario
router.post('/register',async (req, res) => {
    try{
        //Validamos que no se haya registrado con ese username, correo electronico y nit
        //Username
        if(await Publicitario.findOne({username: req.body.username}).lean()){
            res.status(409).json({"field":"username","error":"Este nombre de usuario ya esta en uso"});
            return;
        }
        //Email
        if(await Publicitario.findOne({email: req.body.email}).lean()){
            res.status(409).json({"field":"email","error":"Este email ya esta en uso"});
            return;
        }
        //Nit
        if(await Publicitario.findOne({nit: req.body.nit}).lean()){
            res.status(409).json({"field":"nit","error":"Este nit ya esta en uso"});
            return;
        }
        //Generamos el password encriptandolo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        //Creamos la instancia de publicitario
        let categorias = [];
        req.body.categoriaPublicidad.forEach((data) => {
            categorias.push(data.categoria);
        });
        const newPublicitario = new Publicitario({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            nit:req.body.nit,
            telefono:req.body.telefono,
            categoriaPublicidad:categorias
        });
        //Guardamos el publicitario y se manda el response
        const publicitario = await newPublicitario.save();
        const credentials_publicitario = {
            "username":publicitario.username,
            "rol":"P"
        };
        res.status(200).json(credentials_publicitario);
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
            return res.status(409).json({"error":"Nombre de usuario o contraseña incorrectos"});
        }
        //Validar la contraseña
        const validarPassword = await bcrypt.compare(req.body.password, publicitario.password);
        if(!validarPassword){//Si no coincide la clave se devuelve un error
            return res.status(409).json({"error":"Nombre de usuario o contraseña incorrectos"});
        }
        //Devolver respuesta
        const credentials_publicitario = {
            "username":publicitario.username,
            "rol":"P"
        };
        res.status(200).json(credentials_publicitario);
    }catch(err){
        res.status(500).json(err);
    }
});

//Creación de un PIN
router.post("/crearEvento",upload.single('image'),async (req,res)=>{
    const name = req.body.name;
    const newPin = req.body;
    delete newPin.name
    try{
        const publicitarios = await Publicitario.find().lean();
        const creador = await Publicitario.findOne({"username": name})
        creador.eventosCreados.push(newPin)
        creador.save()
        if (req.file){
            const { filename } = req.file
            newPin.setImgUrl(filename)
        }
        fs.writeFileSync('./database/collections/VEM_BD_Backup_Collection.json',JSON.stringify(publicitarios));
         //Se crea el backup, para tener las bases de datos sincronizadas
        res.status(200).json(newPin);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/actualizarEvento", async (req, res) => {
    const datosPin = req.body[0];
    const filter = req.body[1];
    const name = req.body[2];
    
    try{
        const actualizar = await Publicitario.findOneAndUpdate({"username": name, "eventosCreados.title": filter},
         {'$set': {
            'eventosCreados.$.title':datosPin.title,
            'eventosCreados.$.description':datosPin.description,
            'eventosCreados.$.category':datosPin.category,
            'eventosCreados.$.link':datosPin.link,
            'eventosCreados.$.fechaInicio':datosPin.fechaInicio,
            'eventosCreados.$.fechaFinalizacion':datosPin.fechaFinalizacion
        }});
        const publi = await Publicitario.findOne({'username': name})
        let index = 0;

        for (let i = 0; i < publi.eventosCreados.length; i++) {
            if(publi.eventosCreados[i].title == datosPin.title) { 
                index = i;
            }
        }

        console.log(publi.eventosCreados[index])
        //const publicitarios = await Publicitario.find().lean();
        //fs.writeFileSync('./database/collections/VEM_BD_Backup_Collection.json',JSON.stringify(publicitarios));
        
        res.status(200).json(publi.eventosCreados[index]);
    }catch(err){
        res.status(500).json(err);
    }
});

//Obtener todos los pins del mapa
router.get("/getEventos", async (req, res) => {
    try{
        const pins = await Publicitario.find({},{eventosCreados:1});
        res.status(200).json(pins);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/getFinalizados", async (req, res) => {
    try{
        const fecha = new Date();
        const publicitarios = await Publicitario.find();
        let eventos = [];
        for(let i = 0; i < publicitarios.length; i++){
            for(let j = 0; j < publicitarios[i].eventosCreados.length; j++){
                if(publicitarios[i].eventosCreados[j].fechaFinalizacion < fecha){
                    eventos.push(publicitarios[i].eventosCreados[j]);
                }
            }
        }
        res.status(200).json(eventos);
    }catch(err){
        res.status(500).json(err);
    }
});

//db.publicitarios.find({"eventosCreados.fechaFinalizacion":{$lt:"2022-05-12T14:33:02.104Z"}}).pretty()

router.get("/getFinalEvento", async (req,res) =>{
    try{
        const evento = await Publicitario.findById(req.id);
        res.status(200).json(evento);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/comentar', async (req, res) => {
    try{
        
        const newComentario={
            "username": req.body.username,
            "mensaje": req.body.mensaje,
            "rating": req.body.rating
        }
        console.log(newComentario);
        const comment = await Publicitario.findOne({"eventosCreados.title":req.body.tituloEvento});
        let index = 0;
        for (let i = 0; i < comment.eventosCreados.length; i++) {
            if(comment.eventosCreados[i].title == req.body.tituloEvento){
                index = i;
                break;
            }
        }
        comment.eventosCreados[index].comentarios.push(newComentario);
        comment.save()
        res.status(200).json(comment);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;