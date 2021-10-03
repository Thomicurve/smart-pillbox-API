const { Schema, model } = require('mongoose');
const moment = require('moment');

const recordsSchema = new Schema({
    pillName: {
        type: String,
        required: true
    },
    pillDate: {
        type: String,
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
    pillID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = model('Records', recordsSchema);

