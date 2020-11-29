'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800; 

// Conexion database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Neuron', { useMongoClient: true})
    .then(() => {
        console.log("conexion correcta con Neuron");

        //crear servidor
        app.listen(port, () => {
            console.log("Servidor ejecutandose en http://localhost:3800");
        });
    })
    .catch(err => console.log(err));