'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = Schema({
    publication: { type: Schema.ObjectId, ref: 'Publication' },
    user: { type: Schema.ObjectId, ref: 'User' },
    created_at: String,
    
});