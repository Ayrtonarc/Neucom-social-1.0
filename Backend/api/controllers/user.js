'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var jwt = require('../services/jwt'); //se importa el servicio de JWT

function home(req, res){
    res.status(200).send({
        message: 'Hola mundo desde el servidor de node'
    });
}

function pruebas(req, res){ 
    console.log(req.body);
    res.status(200).send({
        message: 'Accion de prueba en el servidor de Node JS'
    });
}

function saveUser(req, res){
    var params = req.body; //los campos que lleguen por post se guardan en esta variable
    var user = new User(); //creamos un objeto para el modelo de usuario

    if(params.name && params.surname &&                      //si recibimos eta informacion
        params.nick && params.email && params.password){

            user.name = params.name;   //se le asigna un valor a cada propiedad del usuario
            user.surname = params.surname;
            user.nick = params.nick;
            user.email = params.email;
            user.role = 'ROLE_USER';
            user.image = null;
            user.likes = null;
            user.comments = null;
//Controlar usuarios duplicados.
            User.find({ $or: [
                {email: user.email.toLowerCase()},
                {nick: user.nick.toLowerCase()}
            ]}).exec((err, users) => {
        if(err) return res.status(500).send({message: 'Error en la peticion de usuarios'});

        if(users && users.length >= 1){
            return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
        }else{
         //cifrar contrasena
        bcrypt.hash(params.password, null, null, (err, hash) => {
    user.password = hash;

    user.save((err, userStored) => {
        if(err) return res.status(500).send({message: 'Error al guardar usuario'})

        if(userStored){
            res.status(200).send({user: userStored});
        }else{
            res.status(404).send({message: 'No se ha registrado el usuario'});
        }
    });
});
    }
});
//cifrar contrase;as
            
        }else{//si no recibimos la informacion requerida.
            res.status(200).send({
                message: 'Envia todos los campos necesarios!!'
            });
        }
}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;
// que nos devuelva algo que coincida en la base de datos
    User.findOne({email: email}, (err, user) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){
                    
                    if(params.gettoken){
                        //generar y devolver token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }

                    //devolver datos de un usuario
                    user.password = undefined; //no regresar contraseña
                    return res.status(200).send({user});
                }else{
                    return res.status(404).send({message: 'Error el usuario no se ha podido loguear'});
                }
            });
        }else{
            return res.status(404).send({message: 'Error el usuario no se ha podido identificar'});
        }
    });
}
//Conseguir datos de un usuario

function getUser(req, res){
    var userId = req.params.id; //cuando llegan datos por url se usa params, si es por put o post es body }

    User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!user) return res.status(404).send({message: 'El usuario no existe'});

        return res.status(200).send({user});
    });

    }

    //Devolver lista de usuarios paginados
    function getUsers(req, res){
        var identity_user_id = req.user.sub;

        var page = 1;
        if(req.params.page){
            page = req.params.page;
        }
        var itemsPerPage = 5;

        User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
            if(err) return res.status(500).send({message: 'Error en la peticion'});

            if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

            return res.status(200).send({
                users,
                total,
                pages: Math.ceil(total/itemsPerPage)
            });
        });
    }

module.exports = {   //todos los metodos creados se tienen que exportar en routes
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers
    
}