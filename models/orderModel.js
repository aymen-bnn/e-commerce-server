
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Schema = mongoose.Schema
const orderSchema = new Schema({

    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    email : {
        type : String,
        required : true 
    },
    products : {
        type : String
    },
    date : {
        type : String ,
        default : new Date().toISOString().split('T')[0]
    }, 
    address : {
        type : String ,
        required : true
    },
    wilaya : {
        type : String ,
        required : true
    },
    total : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Order' , orderSchema)