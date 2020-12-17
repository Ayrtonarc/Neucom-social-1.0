'use strict' //se tiene que cargar en app js en las rutas

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router(); //para tener acceso a los metodos del router
var md_auth = require('../middlewares/authenticated'); //se importa el middleware de aitenticacion

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

//rutas de cada metodo en los controladores
api.get('/home', UserController.home);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users:page?', md_auth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/update-user-image/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);

module.exports = api;