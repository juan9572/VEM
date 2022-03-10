const express = require('express'); // Libreria para trabajar configurar nuestro backend
const mongoose = require('mongoose'); // Libreria para conectar nuestra base de datos
const dotenv = require('dotenv'); // Libreria para almacenar información sensible como la conexión de la base de datos
const app = express(); // Inicializamos express
const pinRoute = require('./routes/pins');
const publicitariosRoute = require('./routes/publicitarios');

dotenv.config(); // Le damos la configuración inicial al dotenv

app.use(express.json());

let bd = 'mongodb://127.0.0.1/VEM_BD'; //Dirección para conectar a la base de datos localmente.

mongoose.connect(bd,{useNewUrlParser: true, useUnifiedTopology: true}).then( ()=>{ //Realizamos la conexión con la base de datos de mongodb
    console.log('La base de datos esta OK')         //Si la conexión resulta exitosa nos dira "La base de datos esta OK"
}).catch((err) => console.log(err));                //En caso contrario nos mostrara el error.

app.use("/api/pins",pinRoute);
app.use("/api/publicitarios",publicitariosRoute);

app.listen(8800,() =>{
    console.log("El puerto esta OK") //Conectamos express en el puero 8800 y si todo resulta bien nos dira "El puerto esta OK"
})