//Requerimos el módulo de express para crear el servidor
//Express es un módulo que nos permite crear las rutas del servidor y manipular las peticiones entrantes
const express = require('express')

//vamos a requerir el módulo morgan
const morgan = require('morgan')
const cors = require('cors')
const { dbConnection } = require('./db/config');
//Debemos inicializar express y lo que nos regrese lo almacenaremos en una variable llamada app
const app = express()

require('dotenv').config();


app.set('port',3000)

dbConnection();

//Le decimos a la app que utilice morgan
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/usuarios',require('./routes/usuarios.routes'))

module.exports = app;
