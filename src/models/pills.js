const { Schema, model } = require('mongoose');

const PillsSchema = new Schema({
    pillName: {
        type: String,
        required: true
    },
    repeat: {
        type: Number,   //1 = Monday, 2 = Tuesday, ... , 7 = Sunday
        required: true
    },
    pillHour: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
})

module.exports = model('Pills', PillsSchema);