'use strict' //se tiene que cargar en app js en las rutas

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router(); //para tener acceso a los metodos del router
var md_auth = require('../middlewares/authenticated'); //se importa el middleware de aitenticacion

//rutas de cada metodo en los controladores
api.get('/home', UserController.home);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;