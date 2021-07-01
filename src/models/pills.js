const { Schema, model } = require('mongoose');
const moment = require('moment');

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
    }
})

PillsSchema.methods.formatPillDate = function (date) {
    try {
        const pillHour = moment(date).format('LT');
        return pillHour;
    }
    catch {
        throw new Error('Error on format');
    }
    
}

module.exports = model('Pills', PillsSchema);