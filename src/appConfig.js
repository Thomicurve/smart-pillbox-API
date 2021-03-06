const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/mainRoutes');

if(process.env.NODE_ENV !== 'production'){
    const morgan = require('morgan');
    app.use(morgan('dev'));
    const dotenv = require('dotenv');
    dotenv.config({path: path.join(__dirname, '/.env') })
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes)
app.set('port', process.env.PORT);

module.exports = app;