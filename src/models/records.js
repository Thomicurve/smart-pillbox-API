const { Schema, model } = require('mongoose');

const recordsSchema = new Schema({
    pillName: {
        type: String,
        required: true
    },
    pillDate: {
        type: Date,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    }
})

recordsSchema.methods.formatDate = function(date) {
    return new Date(date);
}

module.exports = model('Records', recordsSchema);

