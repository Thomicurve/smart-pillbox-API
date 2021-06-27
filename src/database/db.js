const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
    console.log('Database connected!');
})

mongoose.connection.on('error', err => {
    console.log(err);
})

module.exports = mongoose;