const router = require('express').Router();//Api para creación de publicitarios para la app
const Publicitario = require('../models/users/Publicitario'); //Importamos los modelos
const Cliente = require('../models/users/Cliente');
const bcrypt = require('bcrypt');// Librearia para poder encriptar datos
const fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId;
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

router.post('/upload', upload.single('image'), async (req, res) => {
    const id = new ObjectId(req.body.id);
    const actualizar = await Publicitario.findOneAndUpdate({ "username": req.body.username, "eventosCreados._id": id },
    {
        '$set': {
            'eventosCreados.$.sitio': req.body.sitio,
            'eventosCreados.$.imgBanner': req.file.filename,
        }
    });
    await actualizar.save();
    const publicitarios = await Publicitario.find().lean();
    fs.writeFileSync('./database/collections/VEM_BD_Publicitarios_Backup_Collection.json', JSON.stringify(publicitarios));
    res.status(200).json("Ok");
});

// Registrar publicitario
router.post('/register', async (req, res) => {
    try {
        //Validamos que no se haya registrado con ese username, correo electronico y nit
        //Username
        if (await Publicitario.findOne({ username: req.body.username }).lean()) {
            res.status(409).json({ "field": "username", "error": "Este nombre de usuario ya esta en uso" });
            return;
        }
        //Email
        if (await Publicitario.findOne({ email: req.body.email }).lean()) {
            res.status(409).json({ "field": "email", "error": "Este email ya esta en uso" });
            return;
        }
        //Nit
        if (await Publicitario.findOne({ nit: req.body.nit }).lean()) {
            res.status(409).json({ "field": "nit", "error": "Este nit ya esta en uso" });
            return;
        }
        //Generamos el password encriptandolo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //Creamos la instancia de publicitario
        let categorias = [];
        req.body.categoriaPublicidad.forEach((data) => {
            categorias.push(data.categoria);
        });
        const newPublicitario = new Publicitario({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            nit: req.body.nit,
            telefono: req.body.telefono,
            categoriaPublicidad: categorias
        });
        //Guardamos el publicitario y se manda el response
        const publicitario = await newPublicitario.save();
        const credentials_publicitario = {
            "username": publicitario.username,
            "rol": "P"
        };

        const publicitarios = await Publicitario.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Publicitarios_Backup_Collection.json', JSON.stringify(publicitarios));
        //Se crea el backup, para tener las bases de datos sincronizadas

        res.status(200).json(credentials_publicitario);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logear publicitario
router.post('/login', async (req, res) => {
    try {
        //Encontrar si el usuario esta registrado
        const publicitario = await Publicitario.findOne({ username: req.body.username }).lean();
        if (!publicitario) { //Si no existe el usuario se devuelve un error
            return res.status(409).json({ "error": "Nombre de usuario o contraseña incorrectos" });
        }
        //Validar la contraseña
        const validarPassword = await bcrypt.compare(req.body.password, publicitario.password);
        if (!validarPassword) {//Si no coincide la clave se devuelve un error
            return res.status(409).json({ "error": "Nombre de usuario o contraseña incorrectos" });
        }
        //Devolver respuesta
        const credentials_publicitario = {
            "username": publicitario.username,
            "rol": "P"
        };
        res.status(200).json(credentials_publicitario);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Creación de un PIN
router.post("/crearEvento", async (req, res) => {
    const name = req.body.name;
    const newPin = req.body;
    delete newPin.name;
    const defaultEsta = [
        { mes: "Enero", cantidad: 0 },
        { mes: "Febrero", cantidad: 0 },
        { mes: "Marzo", cantidad: 0 },
        { mes: "Abril", cantidad: 0 },
        { mes: "Mayo", cantidad: 0 },
        { mes: "Junio", cantidad: 0 },
        { mes: "Julio", cantidad: 0 },
        { mes: "Agosto", cantidad: 0 },
        { mes: "Septiembre", cantidad: 0 },
        { mes: "Octubre", cantidad: 0 },
        { mes: "Noviembre", cantidad: 0 },
        { mes: "Diciembre", cantidad: 0 },
    ];
    newPin.estadistica = defaultEsta;
    newPin.rating = 0;
    try {
        const creador = await Publicitario.findOne({ "username": name });
        creador.eventosCreados.push(newPin);
        await creador.save();
        const publicitarios = await Publicitario.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Publicitarios_Backup_Collection.json', JSON.stringify(publicitarios));
        //Se crea el backup, para tener las bases de datos sincronizadas
        res.status(200).json(newPin);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/actualizarEvento", async (req, res) => {
    console.log(req.body);
    /*
    try {
        const actualizar = await Publicitario.findOneAndUpdate({ "username": name, "eventosCreados.title": filter },
            {
                '$set': {
                    'eventosCreados.$.title': datosPin.title,
                    'eventosCreados.$.description': datosPin.description,
                    'eventosCreados.$.category': datosPin.category,
                    'eventosCreados.$.link': datosPin.link,
                    'eventosCreados.$.fechaInicio': datosPin.fechaInicio,
                    'eventosCreados.$.fechaFinalizacion': datosPin.fechaFinalizacion
                }
            });
        const publi = await Publicitario.findOne({ 'username': name })
        let index = 0;

        for (let i = 0; i < publi.eventosCreados.length; i++) {
            if (publi.eventosCreados[i].title == datosPin.title) {
                index = i;
            }
        }
        const publicitarios = await Publicitario.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Publicitarios_Backup_Collection.json', JSON.stringify(publicitarios));
        //Se crea el backup, para tener las bases de datos sincronizadas

        res.status(200).json(publi.eventosCreados[index]);
    } catch (err) {
        res.status(500).json(err);
    }*/
});

router.get("/getBanners", async (req, res) => {
    try {
        const publicitarios = await Publicitario.find();
        let eventos = [];
        for (let i = 0; i < publicitarios.length; i++) {
            for (let j = 0; j < publicitarios[i].eventosCreados.length; j++) {
                if (publicitarios[i].eventosCreados[j].imgBanner) {
                    eventos.push(publicitarios[i].eventosCreados[j]);
                }
            }
        }
        res.status(200).json(eventos);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Obtener todos los pins del mapa
router.get("/getEventos", async (req, res) => {
    try {
        const publicitarios = await Publicitario.find();
        const fecha = new Date();
        let eventos = [];
        for (let i = 0; i < publicitarios.length; i++) {
            for (let j = 0; j < publicitarios[i].eventosCreados.length; j++) {
                if (publicitarios[i].eventosCreados[j].fechaFinalizacion > fecha) {
                    eventos.push(publicitarios[i].eventosCreados[j]);
                }
            }
        }
        res.status(200).json(eventos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getFinalizados", async (req, res) => {
    try {
        const fecha = new Date();
        const publicitarios = await Publicitario.find();
        let eventos = [];
        for (let i = 0; i < publicitarios.length; i++) {
            for (let j = 0; j < publicitarios[i].eventosCreados.length; j++) {
                if (publicitarios[i].eventosCreados[j].fechaFinalizacion < fecha) {
                    eventos.push(publicitarios[i].eventosCreados[j]);
                }
            }
        }
        res.status(200).json(eventos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getFinalEvento", async (req, res) => {
    try {
        const evento = await Publicitario.findById(req.id);
        res.status(200).json(evento);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/comentar', async (req, res) => {
    try {
        const newComentario = {
            "username": req.body.username,
            "mensaje": req.body.mensaje,
            "rating": req.body.rating ? req.body.rating : 0
        }
        const comment = await Publicitario.findOne({ "eventosCreados.title": req.body.tituloEvento });
        let index = 0;
        let ratingActual = 0;
        for (let i = 0; i < comment.eventosCreados.length; i++) {
            if (comment.eventosCreados[i].title == req.body.tituloEvento) {
                index = i;
                for (let j = 0; j < comment.eventosCreados[i].comentarios.length; j++) {
                    ratingActual = ratingActual + comment.eventosCreados[i].comentarios[j].rating;
                }
                break;
            }
        }
        ratingActual += newComentario.rating;
        ratingActual /= comment.eventosCreados[index].comentarios.length + 1;
        comment.eventosCreados[index].comentarios.push(newComentario);
        comment.eventosCreados[index].rating = ratingActual;
        await comment.save();
        let result = {
            rating: comment.eventosCreados[index].rating,
            comment: comment.eventosCreados[index].comentarios[comment.eventosCreados[index].comentarios.length - 1]
        }
        const publicitarios = await Publicitario.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Publicitarios_Backup_Collection.json', JSON.stringify(publicitarios));
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Obtener todos los pins del mapa
router.post("/getComentarios", async (req, res) => {
    const name = req.body[0];
    try {
        const comentarios = await Publicitario.findOne({ "eventosCreados.title": name }, 'eventosCreados');
        let coment = [];
        let event;
        for (let i = 0; i < comentarios.eventosCreados.length; i++) {
            if (comentarios.eventosCreados[i].title == name) {
                coment = comentarios.eventosCreados[i].comentarios;
                event = comentarios.eventosCreados[i];
            }
        }
        let rating = 0;
        for (let i = 0; i < coment.length; i++) {
            rating = rating + coment[i].rating;
        }
        if (coment.length != 0) {
            rating = rating / coment.length;
        }
        event.rating = rating;
        const actualizar = await Publicitario.findOneAndUpdate({ "eventosCreados.title": name },
            {
                '$set': {
                    'eventosCreados.$.rating': rating,
                }
            });
        let resultado = {
            coment: coment,
            event: event
        };
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/getEventosSamePublicitario", async (req, res) => {
    const name = req.body[0];
    try {
        const eventos = await Publicitario.findOne({ "username": name });
        let event = []
        event = eventos.eventosCreados
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/getPonderadoEventos", async (req, res) => {
    const name = req.body[0];
    try {
        const eventos = await Publicitario.findOne({ "username": name });
        let event = []
        event = eventos.eventosCreados
        let ponderado = [
            { mes: "Enero", cantidad: 0 },
            { mes: "Febrero", cantidad: 0 },
            { mes: "Marzo", cantidad: 0 },
            { mes: "Abril", cantidad: 0 },
            { mes: "Mayo", cantidad: 0 },
            { mes: "Junio", cantidad: 0 },
            { mes: "Julio", cantidad: 0 },
            { mes: "Agosto", cantidad: 0 },
            { mes: "Septiembre", cantidad: 0 },
            { mes: "Octubre", cantidad: 0 },
            { mes: "Noviembre", cantidad: 0 },
            { mes: "Diciembre", cantidad: 0 },
        ]
        for (let i = 0; i < eventos.eventosCreados.length; i++) {
            for (let j = 0; j < 12; j++) {
                ponderado[j].cantidad = ponderado[j].cantidad + eventos.eventosCreados[i].estadistica[j].cantidad
            }
        }
        const grafica = {
            estadistica: ponderado,
            title: "Ponderado de eventos"
        }
        res.status(200).json(grafica);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/interaccionEvento", async (req, res) => {
    const name = req.body[0];
    try {
        const id = new ObjectId(name);
        const eventos = await Publicitario.findOne({ "eventosCreados._id": id });
        let index = 0
        for (let i = 0; i < eventos.eventosCreados.length; i++) {
            if (eventos.eventosCreados[i]._id.equals(id)) {
                index = i;
                break;
            }
        }

        let mes = new Date().getMonth()
        eventos.eventosCreados[index].estadistica[mes].cantidad = eventos.eventosCreados[index].estadistica[mes].cantidad + 1
        await eventos.save()
        const publicitarios = await Publicitario.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Publicitarios_Backup_Collection.json', JSON.stringify(publicitarios));
        res.status(200).json(eventos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/getBusquedaEvento", async (req, res) => {
    const name = req.body[0];
    try {
        const publicitarios = await Publicitario.find();
        let eventos = [];
        let reg = new RegExp(name, 'i')
        for (let i = 0; i < publicitarios.length; i++) {
            for (let j = 0; j < publicitarios[i].eventosCreados.length; j++) {
                if (publicitarios[i].eventosCreados[j].title.match(reg) != null ||
                    publicitarios[i].eventosCreados[j].category.match(reg) != null) {
                    eventos.push(publicitarios[i].eventosCreados[j]);
                }
            }
        }
        res.status(200).json(eventos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/filtrarEvento", async (req, res) => {
    const categoria = req.body[0];
    try {
        const publicitarios = await Publicitario.find({ "eventosCreados.category": categoria });
        let eventos = [];
        for (let i = 0; i < publicitarios.length; i++) {
            for (let j = 0; j < publicitarios[i].eventosCreados.length; j++) {
                if (publicitarios[i].eventosCreados[j].category === categoria) {
                    eventos.push(publicitarios[i].eventosCreados[j]);
                }
            }
        }
        res.status(200).json(eventos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getPublicitarios", async (req, res) => {
    try {
        const publi = await Publicitario.find({});
        res.status(200).json(publi);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/getPublicitarioIndividual", async (req, res) => {
    try {
        const publi = await Publicitario.findOne({ username: req.body.username }).lean();
        res.status(200).json(publi);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/getCantidadFollowers", async (req, res) => {
    const name = req.body[0]
    try {
        const clientes = await Cliente.find({}, { seguidos: 1 });
        let cantidad = 0
        for (let i = 0; i < clientes.length; i++) {
            for (let j = 0; j < clientes[i].seguidos.length; j++) {
                if (clientes[i].seguidos[j] == name) {
                    cantidad = cantidad + 1;
                }
            }
        }
        res.status(200).json(cantidad);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/getBusquedaPubli", async (req, res) => {
    const name = req.body.name;
    try {
        const publicitarios = await Publicitario.find();
        let publi = [];
        let reg = new RegExp(name, 'i')
        for (let i = 0; i < publicitarios.length; i++) {
            if (publicitarios[i].username.match(reg) != null) {
                publi.push(publicitarios[i]);
            }
        }
        res.status(200).json(publi);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/gFollowers", async (req, res) => {
    const name = req.body.name
    console.log(req.body)
    try {
        const clientes = await Cliente.find({});
        let datos = []
        for (let i = 0; i < clientes.length; i++) {
            for (let j = 0; j < clientes[i].seguidos.length; j++) {
                if (clientes[i].seguidos[j] == name) {
                    let infoCliente = {
                        username: clientes[i].username,
                        email: clientes[i].email
                    }
                    datos.push(infoCliente)
                }
            }
        }
        console.log(datos)
        res.status(200).json(datos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/deleteEvent", async (req, res) => {
    try {
        const publicitario = await Publicitario.findOne({ username: req.body.username });
        const id = new ObjectId(req.body.id);
        const eventos = publicitario.eventosCreados.filter((evento) => !evento._id.equals(id));
        publicitario.eventosCreados = eventos;
        await publicitario.save();
        const publicitarios = await Publicitario.find().lean();
        fs.writeFileSync('./database/collections/VEM_BD_Publicitarios_Backup_Collection.json', JSON.stringify(publicitarios));
        res.status(200).json("Ok");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/getEventoEspecifico", async (req, res) => {
    try{
        const publicitario = await Publicitario.findOne({username: req.body.username});
        const id = new ObjectId(req.body.id);
        let evento;
        for(let i = 0; i < publicitario.eventosCreados.length; i++){
            if(publicitario.eventosCreados[i]._id.equals(id)){
                evento = publicitario.eventosCreados[i];
                break;
            }
        }
        res.status(200).json(evento);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;