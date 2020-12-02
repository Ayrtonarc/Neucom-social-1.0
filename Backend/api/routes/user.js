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
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users:page?', md_auth.ensureAuth, UserController.getUsers);

module.exports = api;