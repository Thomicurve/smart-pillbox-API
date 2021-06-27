const { Schema, model } = require('mongoose')

const Users = new Schema({
    dni: {
        type: Number,
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        default: 0
    }
})

module.exports = model('Users', Users);