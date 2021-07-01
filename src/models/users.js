const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const Users = new Schema({
    dni: {
        type: String,
        required: true 
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = model('Users', Users);