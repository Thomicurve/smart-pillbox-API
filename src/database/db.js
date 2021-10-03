const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://smart-pillbox:92876374@clouster01.9wkaf.mongodb.net/smart-pillbox?authSource=admin&replicaSet=atlas-hllsoh-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
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