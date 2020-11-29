'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
        name: String,
        surname: String,
        nick: String,
        email: String,
        password: String,
        role: String,
        image: String,
        likes: String,
        comments: String
});

module.exports = mongoose.model('User', UserSchema);